const express = require('express');
const User = require('../models/user');
const authenticate = require('../middleware/authenticate');

const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/users/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).send({
            error: 'Please provide username and password!'
        });
    }

    try {
        const user = await User.findByCredentials(username, password);
        const token = user.generateJsonWebToken();
        
        res.send({user, token});
    } catch (error) {
        res.status(404).send({
            error: error.message
        });
    }
});

router.get('/users/profile', authenticate, async (req, res) => {
    res.send(req.authenticatedUser);
});

router.get('/users/:id', async (req, res) => {
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

router.patch('/users/:id', async (req, res) => {
    const allowedProperties = ['name', 'email', 'password', 'age'];
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
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).send({
                error: 'The user is not found'
            });
        }

        for (propertyName in updatePropertiesRequest) {
            user[propertyName] = updatePropertiesRequest[propertyName];
        }
        
        await user.save();

        res.send(user);
    } catch (error) {
        res.send(error);
    }
});

router.delete('/users/:id', async (req, res) => {
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

module.exports = router;