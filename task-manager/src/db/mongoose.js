const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
});

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
});

// const exampleTask = new Task({
//     description: 'Clean the dishes',
//     completed: false
// });

// exampleTask.save()
//     .then(result => {
//         console.log(result);
//     })
//     .catch(error => {
//         console.log(error);
//     });

const Person = mongoose.model('Person', {
    name: {
        type: String
    },
    married: {
        type: Boolean
    }
});

const examplePerson = new Person({
    name: 'Georgi',
    married: false
}).save();
