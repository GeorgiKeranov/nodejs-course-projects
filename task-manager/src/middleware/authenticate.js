const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function authenticate(req, res, next) {
    try {
        const token = req.header('Authorization');

        if (!token) {
            throw new Error();
        }

        const tokenData = jwt.verify(token, 'YOUR_SECRET_KEY_HERE');

        const authenticatedUser = await User.findById(tokenData._id);
        
        if (!authenticatedUser) {
            throw new Error();
        }

        req.authenticatedUser = authenticatedUser;

        next();
    } catch (error) {
        console.log(error);

        res.send({
            error: 'Please provide a valid authorization token!'
        });
    }
}

module.exports = authenticate;