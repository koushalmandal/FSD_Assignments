require('dotenv').config();
const dns = require('node:dns');
const dnsServers = (process.env.MONGODB_DNS_SERVERS || '').split(',').map(x => x.trim()).filter(Boolean);
if (dnsServers.length) dns.setServers(dnsServers);
const mongoose = require('mongoose');
const app = require('../index');
const Student = require('../models/Student');
const FoundItem = require('../models/FoundItem');
const Claim = require('../models/Claim');

const runId = `phase2-${Date.now()}-${Math.random().toString(16).slice(2)}`;
const emails = [`owner.${runId}@example.edu`, `claimant.${runId}@example.edu`, `other.${runId}@example.edu`];
let itemId;
let server;
const results = [];

function assert(condition, message) {
  if (!condition) throw new Error(`FAIL: ${message}`);
  results.push(`PASS: ${message}`);
}

async function selectProfile(baseUrl, studentId, cookie) {
  const response = await fetch(`${baseUrl}/session`, {
    method: 'POST', redirect: 'manual', headers: { 'content-type': 'application/x-www-form-urlencoded', ...(cookie ? { cookie } : {}) },
    body: new URLSearchParams({ studentId })
  });
  const setCookie = response.headers.get('set-cookie') || '';
  const nextCookie = setCookie.split(';')[0] || cookie;
  assert(response.status === 302 && Boolean(nextCookie), 'student profile selection creates a session');
  return nextCookie;
}

async function post(baseUrl, path, cookie, fields, method = 'POST') {
  return fetch(`${baseUrl}${path}`, {
    method, redirect: 'manual',
    headers: { 'content-type': 'application/x-www-form-urlencoded', cookie },
    body: new URLSearchParams(fields)
  });
}

async function main() {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is required.');
  await mongoose.connect(process.env.MONGODB_URI);
  await Claim.init();
  const [owner, claimant, other] = await Student.create([
    { fullName: 'Phase Two Owner', email: emails[0], department: 'Testing', contactNumber: '1234567890' },
    { fullName: 'Phase Two Claimant', email: emails[1], department: 'Testing', contactNumber: '1234567891' },
    { fullName: 'Phase Two Other', email: emails[2], department: 'Testing', contactNumber: '1234567892' }
  ]);
  const item = await FoundItem.create({ itemName: `Phase 2 test item ${runId}`, category: 'Other', description: 'Temporary integration test record.', foundLocation: 'Test lab', dateFound: new Date(), reportedBy: owner._id });
  itemId = item._id;
  server = app.listen(0);
  await new Promise(resolve => server.once('listening', resolve));
  const baseUrl = `http://127.0.0.1:${server.address().port}`;

  let cookie = await selectProfile(baseUrl, claimant.id);
  const submitted = await post(baseUrl, `/found-items/${item.id}/claims`, cookie, { reason: 'The serial number and case marks match my phone.' });
  assert(submitted.status === 302, 'valid claim submits successfully');
  const claim = await Claim.findOne({ foundItemId: item._id, claimedBy: claimant._id });
  assert(claim && claim.status === 'Pending', 'new claim is stored as Pending');

  const duplicate = await post(baseUrl, `/found-items/${item.id}/claims`, cookie, { reason: 'This is another valid reason for the same item.' });
  assert(duplicate.status === 409, 'duplicate claim by the same student is rejected');

  const shortReason = await post(baseUrl, `/found-items/${item.id}/claims`, await selectProfile(baseUrl, other.id, cookie), { reason: 'Mine' });
  assert(shortReason.status === 400, 'claim reason shorter than 10 characters is rejected');

  cookie = await selectProfile(baseUrl, other.id, cookie);
  const unauthorized = await post(baseUrl, `/claims/${claim.id}/status?_method=PATCH`, cookie, { status: 'Approved' });
  assert(unauthorized.status === 403, 'a non-reporter cannot approve the claim');
  assert((await Claim.findById(claim.id)).status === 'Pending', 'unauthorized approval leaves claim unchanged');

  cookie = await selectProfile(baseUrl, owner.id, cookie);
  const invalidId = await post(baseUrl, '/found-items/not-an-object-id/claims', cookie, { reason: 'This should fail before saving.' });
  assert(invalidId.status === 400, 'malformed item ID is rejected');
  const missing = await post(baseUrl, '/found-items/aaaaaaaaaaaaaaaaaaaaaaaa/claims', cookie, { reason: 'This item does not exist.' });
  assert(missing.status === 404, 'valid but missing item ID returns not found');

  const approved = await post(baseUrl, `/claims/${claim.id}/status?_method=PATCH`, cookie, { status: 'Approved' });
  assert(approved.status === 302, 'reporter can approve the pending claim');
  assert((await FoundItem.findById(item._id)).status === 'Returned', 'approval marks found item Returned');
  assert((await Claim.findById(claim.id)).status === 'Approved', 'approved claim status is stored');

  cookie = await selectProfile(baseUrl, other.id, cookie);
  const returnedClaim = await post(baseUrl, `/found-items/${item.id}/claims`, cookie, { reason: 'I also think this item belongs to me.' });
  assert(returnedClaim.status === 409, 'claim against a Returned item is rejected');

  for (const result of results) console.log(result);
  console.log(`Phase 2 smoke checks passed: ${results.length}/${results.length}`);
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
}).finally(async () => {
  if (server) await new Promise(resolve => server.close(resolve));
  try {
    if (itemId) await Claim.deleteMany({ foundItemId: itemId });
    if (itemId) await FoundItem.deleteOne({ _id: itemId });
    await Student.deleteMany({ email: { $in: emails } });
    await mongoose.disconnect();
  } catch (cleanupError) {
    console.error('Test cleanup issue:', cleanupError.message);
    process.exitCode = 1;
  }
});
