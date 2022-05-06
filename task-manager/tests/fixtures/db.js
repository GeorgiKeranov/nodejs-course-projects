const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const testUsers = [
    {
        _id: new mongoose.Types.ObjectId(),
        name: 'Georgi',
        username: 'georgi',
        email: 'georgi@example.com',
        password: 'passwordExample',
        age: 22
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: 'Ivan',
        username: 'ivan',
        email: 'ivan@example.com',
        password: 'passwordExample',
        age: 35
    }
];

const testTasks = [
    {
        description: 'Task one',
        completed: false,
        owner: testUsers[0]._id
    },
    {
        description: 'Task two',
        completed: true,
        owner: testUsers[0]._id
    },
    {
        description: 'Task three',
        completed: true,
        owner: testUsers[1]._id
    }
];

async function setupDatabase() {
    await User.deleteMany();

    for (user of testUsers) {
        user.tokens = [{
            token: jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY)
        }];

        await new User(user).save();
    }

    await Task.deleteMany();

    for (task of testTasks) {
        await new Task(task).save();
    }
}

async function closeDatabase() {
    await mongoose.connection.close();
}

module.exports = {
    testUsers,
    testTasks,
    setupDatabase,
    closeDatabase
};