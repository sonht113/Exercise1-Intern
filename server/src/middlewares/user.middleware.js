const User = require('../models/User');

const userMiddleware = {
    /**
     * Check email, username, phone.
     * @return Error
     */
    checkUser: async (req, res, next) => {
        const userEmail = await User.findOne({email: req.body.email})
        const userName = await User.findOne({username: req.body.username})
        const userPhone = await User.findOne({phone: req.body.phone})
        if(userName) {
            return res.status(400).json('Name user was already used!')
        }
        if(userEmail){
            return res.status(400).json('Email is exist!')
        }
        if (userPhone) {
            return res.status(400).json('Phone was already used!!')
        }
        next()
    },
    /**
     * TODO: Check user when update
     */

}

module.exports = userMiddleware;
