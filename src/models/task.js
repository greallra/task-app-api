const mongoose = require('mongoose');
const validator = require('validator');

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false
    },
    //id of creator
    owner: {
        type: mongoose.Schema.Types.ObjectId, //the standard mongodb id
        required: true,
        //reference to another model: user, allows access to users easily via task
        ref: 'User'
    }
}, {
    timestamps: true
})

taskSchema.pre('save', async function() {
    const task = this;
    console.log("TASK MIDDLEWARE RAN", task);
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task;