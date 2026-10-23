require('dotenv').config();

// Optional override for Node's SRV resolver when the local DNS proxy is unreliable.
const dns = require('node:dns');
const configuredDnsServers = (process.env.MONGODB_DNS_SERVERS || '')
  .split(',')
  .map(server => server.trim())
  .filter(Boolean);
if (configuredDnsServers.length) dns.setServers(configuredDnsServers);

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const methodOverride = require('method-override');
const Student = require('./models/Student');
const LostItem = require('./models/LostItem');
const FoundItem = require('./models/FoundItem');
const Claim = require('./models/Claim');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'local-demo-secret-change-before-deploying',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' }
}));
app.use(methodOverride('_method'));
app.use((req, res, next) => {
  res.locals.currentStudentId = req.session.studentId || null;
  res.locals.notice = req.session.notice || null;
  delete req.session.notice;
  next();
});

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

function renderError(res, status, title, message) {
  return res.status(status).render('error', { title, message });
}

function asyncRoute(handler) {
  return (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);
}

function requireStudent(req, res, next) {
  const studentId = req.session.studentId;
  if (!studentId || !isValidId(studentId)) return renderError(res, 401, 'Choose a student profile', 'Create a profile or select an existing one before continuing.');
  Student.findById(studentId).then(student => {
    if (!student) {
      delete req.session.studentId;
      return renderError(res, 401, 'Profile not found', 'Select an existing student profile before continuing.');
    }
    req.student = student;
    next();
  }).catch(next);
}

app.get('/', asyncRoute(async (req, res) => {
  const [lostCount, foundCount, studentCount, recentLost, recentFound] = await Promise.all([
    LostItem.countDocuments(), FoundItem.countDocuments(), Student.countDocuments(),
    LostItem.find().sort({ createdAt: -1 }).limit(3).populate('reportedBy', 'fullName'),
    FoundItem.find().sort({ createdAt: -1 }).limit(3).populate('reportedBy', 'fullName')
  ]);
  res.render('home', { lostCount, foundCount, studentCount, recentLost, recentFound });
}));

app.get('/students/new', asyncRoute(async (req, res) => {
  const profiles = await Student.find().sort({ fullName: 1 });
  res.render('student-form', { error: null, values: {}, profiles });
}));

app.post('/students', asyncRoute(async (req, res) => {
  const { fullName, email, department, contactNumber } = req.body;
  const profiles = await Student.find().sort({ fullName: 1 });
  if (![fullName, email, department, contactNumber].every(value => typeof value === 'string' && value.trim())) {
    return res.status(400).render('student-form', { error: 'Please complete every field.', values: req.body, profiles });
  }
  const student = new Student({ fullName, email, department, contactNumber });
  try {
    await student.save();
    req.session.studentId = String(student._id);
  } catch (error) {
    if (error.code === 11000) {
      const profiles = await Student.find().sort({ fullName: 1 });
      return res.status(409).render('student-form', { error: 'That email address already has a student profile. Select it below to continue.', values: req.body, profiles });
    }
    if (error.name === 'ValidationError') {
      const profiles = await Student.find().sort({ fullName: 1 });
      return res.status(400).render('student-form', { error: Object.values(error.errors).map(item => item.message).join(' '), values: req.body, profiles });
    }
    throw error;
  }
  res.redirect(`/students/${student._id}`);
}));

app.post('/session', asyncRoute(async (req, res) => {
  const studentId = typeof req.body.studentId === 'string' ? req.body.studentId : '';
  if (!isValidId(studentId)) return renderError(res, 400, 'Invalid student ID', 'Choose a valid student profile.');
  const student = await Student.findById(studentId);
  if (!student) return renderError(res, 404, 'Student not found', 'Choose an existing student profile.');
  req.session.regenerate(error => {
    if (error) return res.status(500).render('error', { title: 'Session error', message: 'Could not select this profile. Please try again.' });
    req.session.studentId = String(student._id);
    req.session.notice = { type: 'success', text: `You are now acting as ${student.fullName}.` };
    req.session.save(saveError => {
      if (saveError) return res.status(500).render('error', { title: 'Session error', message: 'Could not save your profile selection. Please try again.' });
      res.redirect('/');
    });
  });
}));

app.post('/logout', (req, res, next) => {
  req.session.destroy(error => {
    if (error) return next(error);
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

app.get('/students/:id', asyncRoute(async (req, res) => {
  if (!isValidId(req.params.id)) return renderError(res, 400, 'Invalid student ID', 'The student link is not a valid ID.');
  const student = await Student.findById(req.params.id);
  if (!student) return renderError(res, 404, 'Student not found', 'No student profile matches that ID.');
  const [lostItems, foundItems] = await Promise.all([
    LostItem.find({ reportedBy: student._id }).sort({ createdAt: -1 }),
    FoundItem.find({ reportedBy: student._id }).sort({ createdAt: -1 })
  ]);
  res.render('student-details', { student, lostItems, foundItems });
}));

app.get('/lost-items', asyncRoute(async (req, res) => {
  const filter = {};
  const query = (req.query.q || '').trim();
  if (query) {
    const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    filter.$or = [
      { itemName: { $regex: safeQuery, $options: 'i' } },
      { category: { $regex: safeQuery, $options: 'i' } },
      { lastSeenLocation: { $regex: safeQuery, $options: 'i' } }
    ];
  }
  const items = await LostItem.find(filter).sort({ dateLost: -1 }).populate('reportedBy', 'fullName');
  res.render('lost-items', { items, query });
}));

app.get('/lost-items/new', requireStudent, (req, res) => res.render('lost-item-form', { error: null, values: {} }));

app.post('/lost-items', requireStudent, asyncRoute(async (req, res) => {
  const { itemName, category, description, lastSeenLocation, dateLost } = req.body;
  const values = req.body;
  if (![itemName, category, description, lastSeenLocation, dateLost].every(value => typeof value === 'string' && value.trim())) {
    return res.status(400).render('lost-item-form', { error: 'Please complete every field.', values });
  }
  const item = new LostItem({ itemName, category, description, lastSeenLocation, dateLost, reportedBy: req.student._id });
  try {
    await item.save();
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).render('lost-item-form', { error: 'Check the item details and date, then try again.', values });
    }
    throw error;
  }
  res.redirect(`/lost-items/${item._id}`);
}));

app.get('/lost-items/:id', asyncRoute(async (req, res) => {
  if (!isValidId(req.params.id)) return renderError(res, 400, 'Invalid report ID', 'The lost-item link is not a valid ID.');
  const item = await LostItem.findById(req.params.id).populate('reportedBy', 'fullName email department');
  if (!item) return renderError(res, 404, 'Report not found', 'No lost-item report matches that ID.');
  res.render('lost-item-details', { item });
}));

app.get('/found-items', asyncRoute(async (req, res) => {
  const items = await FoundItem.find().sort({ dateFound: -1 }).populate('reportedBy', 'fullName');
  res.render('found-items', { items });
}));

app.get('/found-items/new', requireStudent, (req, res) => res.render('found-item-form', { error: null, values: {} }));

app.post('/found-items', requireStudent, asyncRoute(async (req, res) => {
  const { itemName, category, description, foundLocation, dateFound } = req.body;
  const values = req.body;
  if (![itemName, category, description, foundLocation, dateFound].every(value => typeof value === 'string' && value.trim())) {
    return res.status(400).render('found-item-form', { error: 'Please complete every field.', values });
  }
  const item = new FoundItem({ itemName, category, description, foundLocation, dateFound, reportedBy: req.student._id });
  try {
    await item.save();
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).render('found-item-form', { error: 'Check the item details and date, then try again.', values });
    }
    throw error;
  }
  res.redirect(`/found-items/${item._id}`);
}));

app.get('/found-items/:id', asyncRoute(async (req, res) => {
  if (!isValidId(req.params.id)) return renderError(res, 400, 'Invalid report ID', 'The found-item link is not a valid ID.');
  const item = await FoundItem.findById(req.params.id).populate('reportedBy', 'fullName email department');
  if (!item) return renderError(res, 404, 'Item not found', 'No found-item report matches that ID.');
  const claims = await Claim.find({ foundItemId: item._id }).sort({ createdAt: -1 }).populate('claimedBy', 'fullName email');
  const isOwner = String(item.reportedBy._id) === String(req.session.studentId);
  const ownClaim = claims.find(claim => String(claim.claimedBy._id) === String(req.session.studentId)) || null;
  res.render('found-item-details-phase2', { item, claims, isOwner, ownClaim });
}));

app.post('/found-items/:id/claims', requireStudent, asyncRoute(async (req, res) => {
  if (!isValidId(req.params.id)) return renderError(res, 400, 'Invalid item ID', 'That found-item link is not a valid ID.');
  const item = await FoundItem.findById(req.params.id);
  if (!item) return renderError(res, 404, 'Item not found', 'No found-item report matches that ID.');
  if (item.status === 'Returned') return renderError(res, 409, 'Item already returned', 'This item has already been returned and cannot receive claims.');
  if (String(item.reportedBy) === String(req.student._id)) return renderError(res, 403, 'You reported this item', 'You cannot claim an item that you reported finding.');
  const reason = typeof req.body.reason === 'string' ? req.body.reason.trim() : '';
  if (reason.length < 10 || reason.length > 1000) return renderError(res, 400, 'Claim needs more detail', 'Explain why the item belongs to you in 10 to 1000 characters.');
  try {
    await Claim.create({ foundItemId: item._id, claimedBy: req.student._id, reason, status: 'Pending' });
  } catch (error) {
    if (error.code === 11000) return renderError(res, 409, 'Claim already submitted', 'You already submitted a claim for this item.');
    throw error;
  }
  req.session.notice = { type: 'success', text: 'Your claim was submitted and is pending review.' };
  res.redirect(`/found-items/${item._id}`);
}));

app.patch('/claims/:id/status', requireStudent, asyncRoute(async (req, res) => {
  if (!isValidId(req.params.id)) return renderError(res, 400, 'Invalid claim ID', 'That claim link is not a valid ID.');
  const status = typeof req.body.status === 'string' ? req.body.status : '';
  if (!['Approved', 'Rejected'].includes(status)) return renderError(res, 400, 'Invalid claim action', 'Choose Approved or Rejected.');
  const claim = await Claim.findById(req.params.id);
  if (!claim) return renderError(res, 404, 'Claim not found', 'No claim matches that ID.');
  const item = await FoundItem.findById(claim.foundItemId);
  if (!item) return renderError(res, 404, 'Item not found', 'The found item for this claim no longer exists.');
  if (String(item.reportedBy) !== String(req.student._id)) return renderError(res, 403, 'Not allowed', 'Only the student who reported this found item can review its claims.');
  if (claim.status !== 'Pending') return renderError(res, 409, 'Claim already reviewed', 'Only pending claims can be reviewed.');
  if (item.status !== 'Available') return renderError(res, 409, 'Item already returned', 'This item is no longer available for claim review.');

  const reviewedClaim = await Claim.findOneAndUpdate(
    { _id: claim._id, status: 'Pending' },
    { $set: { status } },
    { new: true }
  );
  if (!reviewedClaim) return renderError(res, 409, 'Claim already reviewed', 'Another request has already reviewed this claim.');

  if (status === 'Approved') {
    const returnedItem = await FoundItem.findOneAndUpdate(
      { _id: item._id, status: 'Available' },
      { $set: { status: 'Returned' } },
      { new: true }
    );
    if (!returnedItem) {
      await Claim.findOneAndUpdate({ _id: claim._id, status: 'Approved' }, { $set: { status: 'Rejected' } });
      return renderError(res, 409, 'Item already returned', 'Another claim returned this item first.');
    }
    await Claim.updateMany({ foundItemId: item._id, status: 'Pending' }, { $set: { status: 'Rejected' } });
  }

  req.session.notice = { type: 'success', text: status === 'Approved' ? 'Claim approved. The item is now marked Returned.' : 'Claim rejected.' };
  res.redirect(`/found-items/${item._id}`);
}));

app.use((req, res) => renderError(res, 404, 'Page not found', 'That page does not exist. Use the navigation to find your way around.'));

app.use((error, req, res, next) => {
  console.error(error);
  if (res.headersSent) return next(error);
  return renderError(res, 500, 'Something went wrong', 'The server could not complete that request. Please try again.');
});

async function start() {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is missing. Copy .env.example to .env and configure it.');
  await mongoose.connect(process.env.MONGODB_URI);
  await Claim.init();
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Campus Lost & Found is running at http://localhost:${PORT}`));
}

if (require.main === module) {
  start().catch(error => {
    console.error('Could not start the server:', error.message);
    process.exit(1);
  });
}

module.exports = app;
