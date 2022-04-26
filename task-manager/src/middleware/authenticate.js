const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function authenticate(req, res, next) {
    try {
        let token = req.header('Authorization');

        if (!token) {
            throw new Error();
        }

        token = token.replace('Bearer ', '');

        const tokenData = jwt.verify(token, 'YOUR_SECRET_KEY_HERE');

        const authenticatedUser = await User.findOne({ _id: tokenData._id, 'tokens.token': token });
        
        if (!authenticatedUser) {
            throw new Error();
        }

        req.authenticatedUser = authenticatedUser;

        next();
    } catch (error) {
        res.send({
            error: 'Please provide a valid authorization token!'
        });
    }
}

module.exports = authenticate;