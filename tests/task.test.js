const request = require('supertest');
const Task = require('../src/models/task');
const app = require('../src/app');
//can be reused
const { 
    userOneId, 
    userOne, 
    userTwo,
    userTwoId,
    taskOne,
    taskThree,
    setupDatabase 
} = require('./fixtures/db');
const { send } = require('@sendgrid/mail');

//runs before every test
beforeEach(setupDatabase);

test('should create task for user', async ()=>{
    const res = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'hi'
        })
        .expect(201)

    const task = await Task.findById(res.body._id)
    expect(task).not.toBeNull();
    expect(task.completed).toBe(false);
})

test('should get all tasks of given user: user one', async ()=>{
    const res = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(201)
    
     expect(res.body.length).toBe(1)
    
})
test('should not delete other users tasks', async ()=>{
    const res = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .expect(404)
    
    const task = await Task.findById(taskOne._id);
    expect(task).not.toBeNull();
})


//extra test ideas: https://gist.github.com/andrewjmead/988d5965c609a641202600b073e54266