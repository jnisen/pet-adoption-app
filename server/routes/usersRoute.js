"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var userController_1 = require("../controllers/userController");
var contactControllers_1 = require("../controllers/contactControllers");
var validationSchema_1 = require("../middleware/validationSchema");
var encryptPassword_1 = require("../middleware/encryptPassword");
var isUserExist_1 = require("../middleware/isUserExist");
var createToken_1 = require("../middleware/createToken");
var auth_1 = require("../middleware/auth");
var isAdmin_1 = require("../middleware/isAdmin");
var schemaUser_1 = require("../schema/schemaUser");
var schemaMessage_1 = require("../schema/schemaMessage");
router.get('/getAllUsers', auth_1.auth, isAdmin_1.isAdmin, userController_1.getAllUsers)
    .get('/getUser/:id', auth_1.auth, userController_1.getUser)
    .get('/authUser', auth_1.auth, userController_1.getCurrentUser)
    .get('/getMessages/:id', auth_1.auth, contactControllers_1.getMessages)
    .get('/getMessage/:id', auth_1.auth, contactControllers_1.getMessage);
router.post('/signup', schemaUser_1.schemaUserSignUp, validationSchema_1.validationSchema, isUserExist_1.isUserExist, encryptPassword_1.isPasswordTwice, encryptPassword_1.encryptPassword, userController_1.addUser)
    .post('/login', schemaUser_1.schemaUserLogin, validationSchema_1.validationSchema, isUserExist_1.isUserExistCreated, createToken_1.createToken, userController_1.login)
    .post('/addMessage/:id', auth_1.auth, schemaMessage_1.schemaSend, validationSchema_1.validationSchema, contactControllers_1.addMessage);
router.put('/updateUser/:id', auth_1.auth, schemaUser_1.schemaUserLogin, validationSchema_1.validationUserUpdate, isUserExist_1.isUserExist, encryptPassword_1.encryptPassword, userController_1.updateUser)
    .put('/answerMessage/:id', auth_1.auth, isAdmin_1.isAdmin, schemaMessage_1.schemaAnswer, validationSchema_1.validationSchema, contactControllers_1.answerMessage)
    .put('/makeAdmin/:id', auth_1.auth, isAdmin_1.isAdmin, userController_1.makeAdmin);
module.exports = router;
