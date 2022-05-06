const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function authenticate(req, res, next) {
    try {
        let token = req.header('Authorization');

        if (!token) {
            throw new Error();
        }

        token = token.replace('Bearer ', '');

        const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const authenticatedUser = await User.findOne({ _id: tokenData._id, 'tokens.token': token });
        
        if (!authenticatedUser) {
            throw new Error();
        }

        req.tokenForAuthentication = token;
        req.authenticatedUser = authenticatedUser;

        next();
    } catch (error) {
        res.send({
            error: 'Please provide a valid authorization token!'
        });
    }
}

module.exports = authenticate;