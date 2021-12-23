"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var userController_1 = require("../controllers/userController");
var validationSchema_1 = require("../middleware/validationSchema");
var encryptPassword_1 = require("../middleware/encryptPassword");
var isUserExist_1 = require("../middleware/isUserExist");
var createToken_1 = require("../middleware/createToken");
var auth_1 = require("../middleware/auth");
var isAdmin_1 = require("../middleware/isAdmin");
var schemaUser_1 = require("../schema/schemaUser");
router.get('/getAllUsers', auth_1.auth, isAdmin_1.isAdmin, userController_1.getAllUsers)
    .get('/getUser/:id', auth_1.auth, userController_1.getUser)
    .get('/authUser', auth_1.auth, userController_1.getCurrentUser);
router.post('/signup', schemaUser_1.schemaUserSignUp, validationSchema_1.validationUser, isUserExist_1.isUserExist, encryptPassword_1.isPasswordTwice, encryptPassword_1.encryptPassword, userController_1.addUser)
    .post('/login', schemaUser_1.schemaUserLogin, validationSchema_1.validationUser, isUserExist_1.isUserExistCreated, createToken_1.createToken, userController_1.login);
router.put('/updateUser/:id', auth_1.auth, schemaUser_1.schemaUserLogin, validationSchema_1.validationUser, isUserExist_1.isUserExist, encryptPassword_1.encryptPassword, userController_1.updateUser);
module.exports = router;
