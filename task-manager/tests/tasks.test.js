const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const { testUsers, setupDatabase, closeDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

afterAll(closeDatabase);

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${testUsers[0].tokens[0].token}`)
        .send({
            description: 'Test task'
        });
    
    const taskId = response.body._id;
    const task = await Task.findById(taskId);

    expect(task).not.toBeNull();

    expect(task.completed).toBe(false);
});
