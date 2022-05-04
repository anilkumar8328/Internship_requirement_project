const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email address.',
        ]
    },

    mobile: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    collegeId: {
        type: ObjectId,
        trim: true,
        required: true,
        ref: "College"
    },

    isDeleted: {
        type: Boolean,
        default: false
    },


}, { timestamps: true });

module.exports = mongoose.model('Intern', internSchema)