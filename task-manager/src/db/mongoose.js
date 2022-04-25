const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
});

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const exampleTask = new Task({
    description: 'Cook the dinner',
});

exampleTask.save()
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log(error);
    });
