const mongoose = require('mongoose');
const {validatorEmail, validatorPassword} = require('../helpers/validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

userSchema.statics.signup = async function(email, password) {
    if(!email || !password) {
        throw Error('Please fill in all the fields!');
    }

    if(!validatorEmail(email)) {
        throw Error('Invalid email!');
    }

    if(!validatorPassword(password)) {
        throw Error("Password isn't strong enough!");
    }

    const exists = await this.findOne({email});

    if(exists) {
        throw Error('This email is already in use!');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({email, password: hash});

    return user
}

userSchema.statics.login = async function(email, password) {
    if(!email || !password) {
        throw Error('Please fill in all the fields!');
    }

    if(!validatorEmail(email)) {
        throw Error('Invalid email!');
    }

    const user = await this.findOne({email});

    if(!user) {
        throw Error('This email is not linked to any account!');
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match) {
        throw Error('Password is incorrect!');
    }

    return user;
}

module.exports = mongoose.model('User', userSchema);