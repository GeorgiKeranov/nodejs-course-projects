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

const exampleUser = new User({
    name: 'Georgi',
    age: 22
});

exampleUser.save()
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log(error);
    });
