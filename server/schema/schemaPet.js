"use strict";
exports.__esModule = true;
exports.schemaPet = void 0;
var check = require('express-validator').check;
exports.schemaPet = [
    check('type').not().isEmpty().withMessage('type must be mandatory'),
    check('name').not().isEmpty().withMessage('name must be mandatory'),
    check('height').not().isEmpty().withMessage('height must be mandatory'),
    check('weight').not().isEmpty().withMessage('weight must be mandatory'),
    check('color').not().isEmpty().withMessage('color must be mandatory'),
    check('bio').not().isEmpty().withMessage('bio must be mandatory'),
    check('hypoallergenic').not().isEmpty().withMessage('hypoallergenic must be mandatory'),
    check('dietaryRestriction').not().isEmpty().withMessage('dietaryRestrictionmust be mandatory'),
    check('breed').not().isEmpty().withMessage('breed must be mandatory'),
];
