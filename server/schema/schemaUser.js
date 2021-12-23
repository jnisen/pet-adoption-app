"use strict";
exports.__esModule = true;
exports.schemaUserLogin = exports.schemaUserSignUp = void 0;
var check = require('express-validator').check;
exports.schemaUserSignUp = [
    // check('firstName')
    //     .not().isEmpty().withMessage('first name must be mandatory'),
    // check('lastName')
    //     .not().isEmpty().withMessage('last name must be mandatory'),
    check('email')
        .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).withMessage('Do you think is a correct email address?'),
    check('password')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
        .withMessage('Password must contain at least one upper case, one lower case, one digit and at least 6 characters long'),
];
exports.schemaUserLogin = [
    check('email')
        .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        .withMessage('Do you think is a correct email address?'),
    check('password')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
        .withMessage('Password must contain at least one upper case, one lower case, one digit and at least 6 characters long'),
];
