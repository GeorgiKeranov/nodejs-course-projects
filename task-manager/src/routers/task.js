const express = require('express');
const authenticate = require('../middleware/authenticate');
const Task = require('../models/task');

const router = new express.Router();

router.post('/tasks', authenticate, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.authenticatedUser._id
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/tasks', authenticate, async (req, res) => {
    try {
        const authenticatedUser = await req.authenticatedUser.populate('tasks');
        res.send(authenticatedUser.tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/tasks/:id', authenticate, async (req, res) => {  
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.authenticatedUser._id });
        
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

router.patch('/tasks/:id', authenticate, async (req, res) => {
    const allowedProperties = ['description', 'completed'];
    const updatePropertiesRequest = req.body;
    const notAllowedProperties = [];
    for (propertyName in updatePropertiesRequest) {
        if (!allowedProperties.includes(propertyName)) {
            notAllowedProperties.push(propertyName);
        }
    }

    if (notAllowedProperties.length) {
        return res.status(400).send({
            error: 'There are properties that are not allowed to be updated!',
            notAllowedProperties
        });
    }
    
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.authenticatedUser._id });
        
        if (!task) {
            return res.status(404).send({
                error: 'The task is not found'
            });
        }

        for (propertyName in updatePropertiesRequest) {
            task[propertyName] = updatePropertiesRequest[propertyName];
        }

        await task.save();
    
        res.send(task);
    } catch (error) {
        res.send(error);
    }
});

router.delete('/tasks/:id', authenticate, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.authenticatedUser._id });
    
        if (!task) {
            return res.status(404).send({
                error: 'Task is not found!'
            });
        }
    
        task.remove();

        res.send({
            message: 'The task is deleted successfully!'
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;