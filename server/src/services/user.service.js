const User = require('../models/User')

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async ({username, address, avatar, phone, email, password, isAdmin}) => {
    return User.create({
        username,
        address,
        avatar,
        phone,
        email,
        password,
        isAdmin
    })
};

/**
 * Get all user
 * @returns {Object} user
 */
const queryUsers = async () => {
    const users = User.find()
    return users
}

/**
 * Get user by id
 * @param {ObjectId} userId
 * @return {Promise<User>}
 */
const getUserById = async (userId) => {
    const user = User.findById(userId)
    return user;
}

/**
 * Get user by email
 * @return {Promise<User>}
 */
const getUserByEmail = async (email) => {
    const user = User.findOne({email: email})
    return user;
}

/**
 * Get user by username
 * @return {Promise<User>}
 */
const getUserByUsername = async (username) => {
    const user = User.findOne({username: username})
    return user;
}

/**
 * Get user by phone
 * @return {Promise<User>}
 */
const getUserByPhone = async (phone) => {
    const user = User.findOne({phone: phone})
    return user;
}

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateUserBody
 * @return {Object} new user
 */
const updateUserById = async (userId, updateUserBody) => {
    return User.findByIdAndUpdate(userId, updateUserBody);
}

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @return {Object} user
 */
const deleteUserById = async (userId) => {
    return User.findByIdAndDelete(userId);
}

module.exports = {
    createUser,
    queryUsers,
    getUserById,
    getUserByUsername,
    getUserByEmail,
    getUserByPhone,
    updateUserById,
    deleteUserById
}
