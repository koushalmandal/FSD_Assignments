const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();

const User = require('./models/User');
const Child = require('./models/Child');

// Load environment variables from .env file
dotenv.config();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// --------------------------------------------------
// POST /users/:id/children
// Create a child for a parent
// --------------------------------------------------

app.post('/users/:id/children', async (req, res) => {
    const userId = req.params.id;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            message: 'Invalid user ID.'
        });
    }

    try {
        // Find parent user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: 'Parent user not found.'
            });
        }

        // Get child details from request body
        const { firstName, lastName, age, email } = req.body;

        // Validate required fields
        if (
            !firstName ||
            !lastName ||
            age === undefined ||
            age === null ||
            !email
        ) {
            return res.status(400).json({
                message: 'firstName, lastName, age, and email are required.'
            });
        }

        // Create child
        const child = new Child({
            firstName,
            lastName,
            age,
            email,
            parentId: user._id
        });

        // Save child
        await child.save();

        return res.status(201).json({
            message: 'Child created successfully.',
            child
        });
    } catch (error) {
        console.error('Error creating child:', error);

        return res.status(500).json({
            message: 'A server error occurred while creating the child.'
        });
    }
});

// --------------------------------------------------
// GET /users/:id/children
// Get all children of a parent
// --------------------------------------------------

app.get('/users/:id/children', async (req, res) => {
    const userId = req.params.id;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            message: 'Invalid user ID.'
        });
    }

    try {
        // Find parent user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: 'Parent user not found.'
            });
        }

        // Find all children belonging to this parent
        const children = await Child.find({
            parentId: user._id
        });

        return res.status(200).json(children);
    } catch (error) {
        console.error('Error finding children:', error);

        return res.status(500).json({
            message: 'A server error occurred while finding children.'
        });
    }
});

// --------------------------------------------------
// GET /users/:id
// Render user profile and children
// --------------------------------------------------

app.get('/users/:id', async (req, res) => {
    const userId = req.params.id;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send('Invalid user ID.');
    }

    try {
        // Find user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send('User not found.');
        }

        // Find children belonging to this user
        const children = await Child.find({
            parentId: user._id
        });

        // Render EJS profile page
        return res.render('profile', {
            user,
            children
        });
    } catch (error) {
        console.error('Error loading user profile:', error);

        return res.status(500).send(
            'A server error occurred while loading the profile.'
        );
    }
});

// --------------------------------------------------
// Start the server
// --------------------------------------------------

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});