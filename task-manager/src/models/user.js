const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('The email is invlaid!');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    age: {
        type: Number,
        required: true
    },
    tokens: [{
        token: {
            type: String
        }
    }]
}, {
    timestamps: true
});

userSchema.pre('save', hashPasswordBeforeUserSave);
userSchema.pre('updateOne', hashPasswordBeforeUserSave);

// Hash the plain text password before user is saved to the database
async function hashPasswordBeforeUserSave(next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
}

userSchema.pre('remove', async function (next) {
    const user = this;
    
    await Task.deleteMany({ owner: user._id });

    next();
});

// Find user by username and password hash match
userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('Bad credentials, please make sure that your username and password are correct!');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        throw new Error('Bad credentials, please make sure that your username and password are correct!');
    }

    return user;
}

userSchema.methods.generateJsonWebToken = function() {
    const user = this;

    const token =  jwt.sign({ _id: user._id.toString() }, 'YOUR_SECRET_KEY_HERE');

    return token;
};

userSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user.password;
    delete user.tokens;

    return user;
};

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
});

const User = mongoose.model('User', userSchema);

module.exports = User;