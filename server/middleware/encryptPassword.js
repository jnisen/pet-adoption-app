"use strict";
exports.__esModule = true;
exports.isPasswordTwice = exports.encryptPassword = void 0;
var bycript = require('bcrypt');
function encryptPassword(req, res, next) {
    var password = req.body.password;
    var saltRounds = 10;
    bycript.hash(password, saltRounds, function (err, hash) {
        if (err) {
            res.status(500).send('Error Encrypting');
            return;
        }
        req.body.password = hash;
        req.body.confirmPassword = hash;
        next();
    });
}
exports.encryptPassword = encryptPassword;
function isPasswordTwice(req, res, next) {
    try {
        var _a = req.body, password = _a.password, confirmPassword = _a.confirmPassword;
        if (password !== confirmPassword)
            res.status(400).send('Password Not Matches');
        else
            next();
    }
    catch (e) {
        console.log(e);
    }
}
exports.isPasswordTwice = isPasswordTwice;
