"use strict";
exports.__esModule = true;
exports.auth = void 0;
var jwt = require('jsonwebtoken');
require('dotenv').config();
function auth(req, res, next) {
    var token = req.cookies.token;
    try {
        var decoded = jwt.verify(token, 'process.env.SECRET_KEY');
        req.user = decoded;
        next();
    }
    catch (e) {
        return res.status(401).json({ msg: 'Invalid Token' });
    }
}
exports.auth = auth;
