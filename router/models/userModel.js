const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

// schema for user data for mongodb
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        index: true,
        unique: true,
        required: true,
    },
    hashedPassword: {
        type: String,
        required: true
    },
    versionKey: false
}, { collection: 'users' })

UserSchema.plugin(uniqueValidator, { message: '{PATH} needs to be unique.' });

module.exports = mongoose.model('UserModel', UserSchema);