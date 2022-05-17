const jwt = require("jsonwebtoken");


const authMiddleware = {
    /**
     * Verify token
     */
    verifyToken: (req, res, next) => {
        const accessToken = req.cookies.accessToken
        if(accessToken) {
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err) => {
                if(err) {
                    return res.status(403).json("Token is not valid!")
                }
                next()
            })
        } else {
            return res.status(401).json("You are not authentication!")
        }
    },
    /**
     * Verify token and admin
     */
    verifyTokenAndAdmin: (req, res, next) => {
        const accessToken = req.cookies.accessToken
        if(accessToken) {
            try {
                jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err) => {
                    if(err) {
                        return res.status(403).json("Token is not valid!")
                    }

                    const dataJWT = jwt.decode(accessToken, process.env.JWT_ACCESS_KEY)

                    // check data of jwt with params.
                    if(dataJWT.id === req.params.id || dataJWT.isAdmin) {
                        next()
                    } else {
                        return res.status(403).json('You are not admin!')
                    }
                })

            } catch (e) {
                return res.status(401).send('Unauthorized');
            }
        } else{
            return res.status("403").json("You are not authentication!")
        }
    }
}

module.exports = authMiddleware