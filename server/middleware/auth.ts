const jwt = require('jsonwebtoken')
require('dotenv').config();

export function auth(req, res, next) {

    const { token } = req.cookies
    try {
        const decoded = jwt.verify(token, 'process.env.SECRET_KEY')
        req.user = decoded
        next()
    } catch (e) {
        return res.status(401).json({ msg: 'Invalid Token' })
    }
}
