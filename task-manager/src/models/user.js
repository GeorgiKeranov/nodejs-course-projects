const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    }
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

const User = mongoose.model('User', userSchema);

module.exports = User;