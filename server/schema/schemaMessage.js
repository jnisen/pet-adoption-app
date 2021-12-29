"use strict";
exports.__esModule = true;
exports.schemaAnswer = exports.schemaSend = void 0;
var check = require('express-validator').check;
exports.schemaSend = [
    check('subject').not().isEmpty().withMessage('Subject must be mandatory'),
    check('message').not().isEmpty().withMessage('Message must be mandatory'),
];
exports.schemaAnswer = [
    check('answer').not().isEmpty().withMessage('Answer must be mandatory'),
];
