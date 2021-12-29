"use strict";
exports.__esModule = true;
exports.schemaPet = void 0;
var check = require('express-validator').check;
exports.schemaPet = [
    check('type').not().isEmpty().withMessage('Type must be mandatory'),
    check('name').not().isEmpty().withMessage('Name must be mandatory'),
    check('height').not().isEmpty().withMessage('Height must be mandatory'),
    check('weight').not().isEmpty().withMessage('Weight must be mandatory'),
    check('color').not().isEmpty().withMessage('Color must be mandatory'),
    check('bio').not().isEmpty().withMessage('Bio must be mandatory'),
    check('hypoallergenic').not().isEmpty().withMessage('Hypoallergenic must be mandatory'),
    check('dietaryRestriction').not().isEmpty().withMessage('DietaryRestriction must be mandatory'),
    check('breed').not().isEmpty().withMessage('Breed must be mandatory'),
];
