const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {loginService, tokenService} = require('../services')

const loginUser = async (req, res) => {
    try {
        const user = await loginService.loginUser(req.body.email)
        if(!user) {
            return res.status(404).json('User not found!')
        }
        // Check password
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) {
            return res.status(404).json('Invalid password!')
        }
        if(user && validPassword) {
            // Access token
            const accessToken = tokenService.generateAccessToken(user)
            // Save access token in cookie
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict'
            })
            const {password, ...others} = user._doc
            return res.status(200).json({...others, accessToken})
        }
    }catch (err) {
        console.log(err)
        return res.status(500).json('Error')
    }
}

/* LOGOUT */
const logoutUser = async (req, res) => {
    try {
        res.clearCookie('accessToken')
        return res.status(200).json('Log out successfully!')
    } catch (e) {
        return res.status(500).json(e)
    }
}

module.exports = {
    loginUser,
    logoutUser
}