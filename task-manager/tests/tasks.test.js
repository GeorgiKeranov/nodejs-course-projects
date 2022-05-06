const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const { testUsers, testTasks, setupDatabase, closeDatabase } = require('./fixtures/db');

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

test('Should get all tasks for user "georgi"', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${testUsers[0].tokens[0].token}`)
        .send()
        .expect(200);

    const numberOfTasks = response.body.length;
    
    expect(numberOfTasks).toBe(2);
});

test('Should not delete task owned by other user', async () => {
    const response = await request(app)
        .delete(`/tasks/${testTasks[2]._id}`)
        .set('Authorization', `Bearer ${testUsers[0].tokens[0].token}`)
        .send()
        .expect(404);

    const task = await Task.findById(testTasks[2]._id);

    expect(task).not.toBeNull();
});