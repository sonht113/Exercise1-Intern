const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        trim: true,
        min: 6
    },
    classStudent: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String,
        required: true,
        trim: true
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Student', studentSchema);
