const mongoose = require('mongoose');

export const PetSchema = mongoose.Schema({
    type: {
        type: 'string',
        required: true,
        trim: true
    },
    name: {
        type: 'string',
        required: true,
        trim: true
    },
    status: {
        type: 'string',
        required: true,
        trim: true,
        default: 'Available',
        enum: ['Available', 'Foster', 'Adopted']
    },
    picture: {
        type: 'string',
        required: true,
        trim: true,
    },
    height: {
        type: 'number',
        required: true,
        trim: true
    },
    weight: {
        type: 'number',
        required: true,
        trim: true
    },
    color: {
        type: 'string',
        required: true,
        trim: true,
    },
    bio: {
        type: 'string',
        required: true,
        trim: true,
    },
    hypoallergenic: {
        type: 'boolean',
        required: true,
        default: false
    },
    dietaryRestriction: {
        type: 'string',
        required: true,
        trim: true,
    },
    breed: {
        type: 'string',
        required: true,
        trim: true,
    },
    cloudinary_id: {
        type: 'string'
    }

}, { timestamps: true })


module.exports = mongoose.model('pets', PetSchema)