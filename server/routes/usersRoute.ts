const express = require('express')
const router = express.Router()


import { addUser, getAllUsers, login, getUser, updateUser, getCurrentUser, makeAdmin } from '../controllers/userController'
import { addMessage, getMessages, getMessage, answerMessage } from '../controllers/contactControllers'

import { validationSchema, validationUserUpdate } from '../middleware/validationSchema'
import { encryptPassword, isPasswordTwice } from '../middleware/encryptPassword'
import { isUserExist, isUserExistCreated } from '../middleware/isUserExist'
import { createToken } from '../middleware/createToken'
import { auth } from '../middleware/auth'
import { isAdmin } from '../middleware/isAdmin'

import { schemaUserLogin, schemaUserSignUp } from '../schema/schemaUser'
import { schemaSend, schemaAnswer } from '../schema/schemaMessage'


router.get('/getAllUsers', auth, isAdmin, getAllUsers)
      .get('/getUser/:id', auth, getUser)
      .get('/authUser', auth, getCurrentUser)
      .get('/getMessages/:id', auth, getMessages)
      .get('/getMessage/:id', auth, getMessage)

router.post('/signup', schemaUserSignUp, validationSchema, isUserExist, isPasswordTwice, encryptPassword, addUser)
      .post('/login', schemaUserLogin, validationSchema, isUserExistCreated, createToken, login)
      .post('/addMessage/:id', auth, schemaSend, validationSchema, addMessage)


router.put('/updateUser/:id', auth, schemaUserLogin, validationUserUpdate, isUserExist, encryptPassword, updateUser)
      .put('/answerMessage/:id', auth, isAdmin, schemaAnswer, validationSchema, answerMessage)
      .put('/makeAdmin/:id', auth, isAdmin, makeAdmin)


module.exports = router

