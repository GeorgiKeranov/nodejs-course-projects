const fs = require('fs');
const path = require('path');
const express = require('express');
const User = require('../models/user');
const authenticate = require('../middleware/authenticate');
const imageUploadMiddleware = require('../middleware/image-upload');

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
        
        user.tokens.push({ token });
        await user.save();

        res.send({user, token});
    } catch (error) {
        res.status(404).send({
            error: error.message
        });
    }
});

router.post('/users/logout', authenticate, async (req, res) => {
    const tokenForAuthentication = req.tokenForAuthentication;
    const authenticatedUser = req.authenticatedUser;

    authenticatedUser.tokens = authenticatedUser.tokens.filter(tokenObj => {
        return tokenObj.token !== tokenForAuthentication;
    });
    
    try {
        await authenticatedUser.save();
        res.send({
            'message': 'You have been logged out successfully!'
        });
    } catch (error) {
        res.status(500).send({
            error: 'Error, please try again later!'
        });
    }
});

router.post('/users/logoutAllDevices', authenticate, async (req, res) => {
    const authenticatedUser = req.authenticatedUser;
    authenticatedUser.tokens = [];
    
    try {
        await authenticatedUser.save();
        res.send({
            'message': 'You have been logged out from all devices successfully!'
        });
    } catch (error) {
        res.status(500).send({
            error: 'Error, please try again later!'
        });
    }
});

router.get('/users/profile', authenticate, async (req, res) => {
    res.send(req.authenticatedUser);
});

router.patch('/users/profile', authenticate, async (req, res) => {
    // Check if only the allowed properties are in the request
    const allowedProperties = ['name', 'email', 'password', 'age'];
    const updatePropertiesRequest = req.body;
    const notAllowedProperties = [];
    for (propertyName in updatePropertiesRequest) {
        if (!allowedProperties.includes(propertyName)) {
            notAllowedProperties.push(propertyName);
        }
    }

    // If there are not allowed properties in the request send error with their names
    if (notAllowedProperties.length) {
        return res.status(400).send({
            error: 'There are properties that are not allowed to be updated!',
            notAllowedProperties
        });
    }

    try {
        const authenticatedUser = req.authenticatedUser;

        for (propertyName in updatePropertiesRequest) {
            authenticatedUser[propertyName] = updatePropertiesRequest[propertyName];
        }
        
        await authenticatedUser.save();

        res.send(authenticatedUser);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/users/profile', authenticate, async (req, res) => {
    try {
        req.authenticatedUser.remove();
        
        res.send({
            message: 'Your profile is deleted successfully!'
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/users/profile/avatar', authenticate, imageUploadMiddleware, async (req, res) => {
    const file = req.file;
    
    if (!file) {
        return res.status(400).send({
            error: 'Please attach image with name "image" to the request!'
        });
    }

    try {
        const authenticatedUser = req.authenticatedUser;

        // Check if the user has already an avatar
        if (authenticatedUser.avatar) {
            const uploadsDirectory = path.join(__dirname, '../../public/uploads/');
            const avatarImagePath = uploadsDirectory + authenticatedUser.avatar;
            
            if (fs.existsSync(avatarImagePath)) {
                fs.unlinkSync(avatarImagePath);
            }
        }

        authenticatedUser.avatar = file.filename;
        await authenticatedUser.save();
        
        res.send({
            message: 'Image is saved successfully!'
        });
    } catch (error) {
        res.status(500).send(error);
    }

}, (err, req, res, next) => {
    res.status(400).send({ error: err.message });
});

module.exports = router;