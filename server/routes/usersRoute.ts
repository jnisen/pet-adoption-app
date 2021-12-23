const express = require('express')
const router = express.Router()


import { addUser, getAllUsers, login, getUser, updateUser, getCurrentUser } from '../controllers/userController'

import { validationUser } from '../middleware/validationSchema'
import { encryptPassword, isPasswordTwice } from '../middleware/encryptPassword'
import { isUserExist, isUserExistCreated } from '../middleware/isUserExist'
import { createToken } from '../middleware/createToken'
import { auth } from '../middleware/auth'
import { isAdmin } from '../middleware/isAdmin'

import { schemaUserLogin, schemaUserSignUp } from '../schema/schemaUser'


router.get('/getAllUsers', auth, isAdmin, getAllUsers)
      .get('/getUser/:id', auth, getUser)
      .get('/authUser', auth, getCurrentUser)

router.post('/signup', schemaUserSignUp, validationUser, isUserExist, isPasswordTwice, encryptPassword, addUser)
      .post('/login', schemaUserLogin, validationUser, isUserExistCreated, createToken, login)


router.put('/updateUser/:id', auth, schemaUserLogin, validationUser, isUserExist, encryptPassword, updateUser)


module.exports = router

