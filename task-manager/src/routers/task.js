const express = require('express');
const Task = require('../models/task');

const router = new express.Router();

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/tasks/:id', async (req, res) => {
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

router.patch('/tasks/:id', async (req, res) => {
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

router.delete('/tasks/:id', async (req, res) => {
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

module.exports = router;