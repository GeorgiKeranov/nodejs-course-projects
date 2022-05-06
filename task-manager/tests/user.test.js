const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user');

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

beforeAll(async () => {
    await User.deleteMany();
});

test('Should signup a new user', async () => {
    const response = await request(app)
        .post('/users')
        .send(testUser)
        .expect(201);

    const userId = response.body._id;
    const user = await User.findById(userId);
    expect(user).not.toBeNull();
});

test('Should login existing user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            username: testUser.username,
            password: testUser.password
        })
        .expect(200);
});

test('Should not login nonexisting user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            username: 'nonexisting',
            password: 'nonexisting'
        })
        .expect(404);
});

test('Should get profile for authenticated user', async () => {
    await request(app)
        .get('/users/profile')
        .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
        .send()
        .expect(200);
});

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/profile') 
        .send()
        .expect(401);
});

test('Should delete profile for authenticated user', async () => {
    await request(app)
        .delete('/users/profile')
        .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
        .send()
        .expect(200);
});

test('Should not delete profile for unauthenticated user', async () => {
    await request(app)
        .delete('/users/profile')
        .send()
        .expect(401);
});
