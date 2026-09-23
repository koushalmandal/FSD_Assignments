const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

// Allows Express to read JSON data
app.use(express.json());

// MongoDB Model
const Child = mongoose.model('Child', {
    firstName: String,
    lastName: String,
    Phone: Number
});

const PORT = process.env.PORT || 3000;


// Connect MongoDB
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {

        console.log('Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });


// Home
app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    });
});


// ADD DATA
app.post('/add', async (req, res) => {

    try {

        const newChild = await Child.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            Phone: req.body.Phone
        });

        res.status(201).json({
            message: 'Record added successfully',
            data: newChild
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
});