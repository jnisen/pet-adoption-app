"use strict";
exports.__esModule = true;
exports.validationPet = exports.validationUser = void 0;
var validationResult = require('express-validator').validationResult;
function validationUser(req, res, next) {
    var errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }
    next();
}
exports.validationUser = validationUser;
function validationPet(req, res, next) {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}
exports.validationPet = validationPet;
