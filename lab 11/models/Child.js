// Child.js - Mongoose model for the Child collection

const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Reference to the User model
    }
});

// Create the Child model using the schema
const Child = mongoose.model('Child', childSchema);

// Export the Child model
module.exports = Child;