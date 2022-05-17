const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            maxlength: 25,
            required: true,
            trim: true,
        },
        address: {
            type: String,
            maxlength: 100,
            required: true,
            trim: true,
        },
        avatar: {
            type: String,
            required: true,
            trim: true,
            default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIWpD65lqTtrhnWjA4DHJXoNtjTaRCcSUuPQ&usqp=CAU'
        },
        phone: {
            type: String,
            minlength: 10,
            maxlength: 12,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            minlength: 8,
            required: true,
            validator(value) {
                if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                    throw new Error(
                        'Password must contain at least one letter and one number'
                    );
                }
            },
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

/**
 * @param {string} password
 * @returns {hash<password>}
 */
userSchema.pre('save', async function (next) {
    const user = this;
    const salt = await bcrypt.genSalt(10);
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, salt);
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
