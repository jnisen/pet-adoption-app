const { check } = require('express-validator')

export const schemaSend = [
    check('subject').not().isEmpty().withMessage('Subject must be mandatory'),
    check('message').not().isEmpty().withMessage('Message must be mandatory'),
]

export const schemaAnswer = [
    check('answer').not().isEmpty().withMessage('Answer must be mandatory'),
]