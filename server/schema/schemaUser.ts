const { check } = require('express-validator')

export const schemaUserSignUp = [
    // check('firstName')
    //     .not().isEmpty().withMessage('first name must be mandatory'),
    // check('lastName')
    //     .not().isEmpty().withMessage('last name must be mandatory'),
    check('email')
        .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).withMessage('Do you think is a correct email address?'),
    check('password')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
        .withMessage('Password must contain at least one upper case, one lower case, one digit and at least 6 characters long'),
    // check('phoneNumber')
    // .not().isEmpty().withMessage('PhoneNumber 1')
]


export const schemaUserLogin = [
    check('email')
        .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        .withMessage('Do you think is a correct email address?'),
    check('password')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
        .withMessage('Password must contain at least one upper case, one lower case, one digit and at least 6 characters long'),
]
