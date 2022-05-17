const User = require('../models/User')

const loginUser = async (email) => {
    const user = await User.findOne({email: email})
    return user;
}

module.exports = {
    loginUser
}