"use strict";
exports.__esModule = true;
exports.usuarioSchema = void 0;
var mongoose = require('mongoose');
exports.usuarioSchema = mongoose.Schema({
    firstName: {
        type: 'string',
        required: true,
        trim: true
    },
    lastName: {
        type: 'string',
        required: true,
        trim: true
    },
    email: {
        type: 'string',
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: 'string',
        required: true,
        trim: true
    },
    confirmPassword: {
        type: 'string',
        required: true,
        trim: true
    },
    phoneNumber: {
        type: 'string',
        required: true,
        trim: true,
        unique: true
    },
    bio: {
        type: 'string',
        trim: true,
        "default": undefined
    },
    role: {
        type: 'string',
        required: true,
        trim: true,
        "default": undefined
    },
    savedPets: {
        type: [String],
        trim: true,
        "default": undefined
    },
    adoptedFosterPets: {
        type: [String],
        trim: true,
        "default": undefined
    }
}, { timestamps: true });
module.exports = mongoose.model('users', exports.usuarioSchema);
