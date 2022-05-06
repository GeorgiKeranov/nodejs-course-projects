const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { testUser, setupDatabase, closeDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

afterAll(closeDatabase);

test('Should signup a new user', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            name: 'Georgi',
            username: 'georgi2',
            email: 'georgi2@example.com',
            password: 'passwordExample',
            age: 22,
        })
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

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/profile')
        .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
        .send({
            name: 'Ivan'
        })
        .expect(200);

    const user = await User.findById(testUser._id);
    expect(user.name).toBe('Ivan');
});

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/profile')
        .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
        .send({
            category: 'Example'
        })
        .expect(400);
});

test('Should upload profile image for user', async () => {
    await request(app)
        .post('/users/profile/avatar')
        .set('Authorization', `Bearer ${testUser.tokens[0].token}`)
        .attach('image', 'tests/fixtures/placeholder-image.png')
        .expect(200);

    const user = await User.findById(testUser._id);
    expect(user.avatar).toBeTruthy();
});

test('Should delete profile for user', async () => {
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
