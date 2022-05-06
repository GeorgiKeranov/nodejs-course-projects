const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');

const generatedId = new mongoose.Types.ObjectId();

const testUser = {
    _id: generatedId,
    name: 'Georgi',
    username: 'georgi',
    email: 'georgi@example.com',
    password: 'passwordExample',
    age: 22,
    tokens: [{
        token: jwt.sign({ _id: generatedId._id }, process.env.JWT_SECRET_KEY)
    }]
};

async function setupDatabase() {
    await User.deleteMany();
    await new User(testUser).save();
}

async function closeDatabase() {
    await mongoose.connection.close();
}

module.exports = {
    testUser,
    setupDatabase,
    closeDatabase
};