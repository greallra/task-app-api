//need below 2 for creating token
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'bill',
    email: 'bill@gmail.com',
    password: 'red1234',
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}
const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: 'mike',
    email: 'mike@gmail.com',
    password: 'green1234',
    tokens: [{
        token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'banana',
    completed: false,
    owner: userOneId
}
const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'orange',
    completed: true,
    owner: userTwo._id
}
const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'grape',
    completed: true,
    owner: userTwo._id
}


const setupDatabase = async () =>{
    //delete db user/tasks before tests
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
}

module.exports = {
    userOneId,
    userOne,
    setupDatabase,
    userTwoId,
    userTwo,
    taskOne,
    taskThree
}