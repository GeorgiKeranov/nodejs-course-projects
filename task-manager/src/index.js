const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();

app.use(express.json());

app.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/users/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).send({
                error: 'User is not found!'
            });
        }

        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.patch('/users/:id', async (req, res) => {
    const allowedProperties = ['name', 'email', 'password', 'age'];
    const updatePropertiesRequest = req.body;
    const notAllowedProperties = getPropertiesThatAreNotAllowed(allowedProperties, updatePropertiesRequest);

    if (notAllowedProperties.length) {
        return res.status(400).send({
            error: 'There are properties that are not allowed to be updated!',
            notAllowedProperties
        });
    }

    const id = req.params.id;
    try {
        const user = await User.findByIdAndUpdate(id, updatePropertiesRequest, {
            new: true,
            runValidators: true
        });
    
        if (!user) {
            return res.status(404).send({
                error: 'The user is not found'
            });
        }
    
        res.send(user);
    } catch (error) {
        res.send(error);
    }
});

app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const isDeleted = await User.findByIdAndDelete(id);
    
        if (!isDeleted) {
            return res.status(404).send({
                error: 'User is not found!'
            });
        }
    
        res.send(isDeleted);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/tasks/:id', async (req, res) => {
    const id = req.params.id;
    
    try {
        const task = await Task.findById(id);
        
        if (!task) {
            return res.status(404).send({
                error: 'Task is not found!'
            });
        }

        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.patch('/tasks/:id', async (req, res) => {
    const allowedProperties = ['description', 'completed'];
    const updatePropertiesRequest = req.body;
    const notAllowedProperties = getPropertiesThatAreNotAllowed(allowedProperties, updatePropertiesRequest);

    if (notAllowedProperties.length) {
        return res.status(400).send({
            error: 'There are properties that are not allowed to be updated!',
            notAllowedProperties
        });
    }
    
    const id = req.params.id;
    try {
        const task = await Task.findByIdAndUpdate(id, updatePropertiesRequest, {
            new: true,
            runValidators: true
        });
    
        if (!task) {
            return res.status(404).send({
                error: 'The task is not found'
            });
        }
    
        res.send(task);
    } catch (error) {
        res.send(error);
    }
});

app.delete('/tasks/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const isDeleted = await Task.findByIdAndDelete(id);
    
        if (!isDeleted) {
            return res.status(404).send({
                error: 'Task is not found!'
            });
        }
    
        res.send(isDeleted);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

function getPropertiesThatAreNotAllowed(allowedProperties, properties) {
    const notAllowedProperties = [];
    for (propertyName in properties) {
        if (!allowedProperties.includes(propertyName)) {
            notAllowedProperties.push(propertyName);
        }
    }

    return notAllowedProperties;
}