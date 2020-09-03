const express = require('express');
const router = new express.Router();
const Task = require('../models/task');
const auth = require('../middleware/auth');

//CREATE TASK
router.post('/tasks', auth, async(req, res)=>{
    // const task = new Task(req.body);
    //now we have access to user because of token
    const task = new Task({
        ...req.body,
        //owner
        owner: req.user._id
    });
    try {
        const newTask = await task.save();
        res.status(201).send(newTask)
    }catch (e) {
        console.log(e);
        res.status(400).send(e)
    }
})
//PAGINATION
// /tasks?limit=10&skip=0
// /tasks/limit=10&skip=20 skip=0 is first page
// /tasks?sortBy=createdAt_asc /tasks?sortBy=createdAt_desc
//user can dictate what they get back
router.get('/tasks', auth, async (req,res)=>{
    const match = {};
    const sort = {};
    if(req.query.completed) {
        //conerting match to a boolean witht this expression
        match.completed = req.query.completed === 'true';
    }
    if(req.query.sortBy) {
        const parts = req.query.sortBy.split('_');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
        //result = createdAt: -1
    }
    
    //get tasks only for authenticated user
    //1. 
    try {
        // const tasks = await Task.find({})
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                //will be ignored if not defined
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.status(201).send(req.user.tasks)
    }catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks/:id', auth, async (req,res)=>{
    //url id
    const _id = req.params.id;
    try {
        //const task = await Task.findById(id)
        //findOne to use multpile fields on search
        //get task that matches id and owner
        const task = await Task.findOne({_id: _id, owner: req.user._id})
      
        if(!task) {return res.status(404).send('no task found')}
        res.status(201).send(task)
    }catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/tasks/:id', auth, async (req,res)=>{
      //updated to use middleware
    
    // const options = {
    //     new: true, //return the updated user
    //     runValidators: true
    // }
    const id = req.params.id;
    const updatesAllowed = ['description', 'completed'];
    const updatesReceivedByClient = Object.keys(req.body);
    const isValidOperation = updatesReceivedByClient.every(update => updatesAllowed.includes(update))

    if(!isValidOperation) {
        res.status(400).send({error: 'invalid updates'})
    }
    try {
        const task = await Task.findOne({_id: id, owner: req.user._id});
        // const task = await Task.findById(id);
 
      
        // const task = await Task.findByIdAndUpdate(id, req.body, options);
        if(!task) {return res.status(404).send('no task found')}

        updatesReceivedByClient.forEach((update)=>{
            task[update] = req.body[update]
        })
        await task.save();
        res.status(201).send(task)
    }catch (e) {
        console.log(e);
        res.status(400).send(e)
    }
})
router.delete('/tasks/:id', auth, async(req,res)=>{
    const id = req.params.id;
    try {
        // const taskDeleted = await Task.findByIdAndDelete(id);
        console.log("*****", id, req.user._id);
        const taskDeleted = await Task.findOneAndDelete({_id: id, owner: req.user._id});
        if(!taskDeleted) { return res.status(404).send()}
        res.send(taskDeleted);
    } catch (e) {
        console.log(e);
        res.send(500).send();
    }
})



module.exports = router;