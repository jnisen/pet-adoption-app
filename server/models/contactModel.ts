const mongoose = require('mongoose');

export const contactSchema = mongoose.Schema({
    userId: {
        type: 'string',
        required: true,
        trim: true
    },
    name: {
        type: 'string',
        required: true,
        trim: true
    },
    email: {
        type: 'string',
        required: true,
        trim: true,
        lowercase: true,

    },
    subject: {
        type: 'string',
        required: true,
        trim: true,
        lowercase: true,

    },
    message: {
        type: 'string',
        required: true,
        trim: true,
        lowercase: true,

    },
    answer: {
        type: 'string',
        trim: true,
        lowercase: true,
        default: '',

    },
    status: {
        type: 'string',
        trim: true,
        lowercase: true,
        default: 'In progress'

    },

}, { timestamps: true })


module.exports = mongoose.model('contact', contactSchema)