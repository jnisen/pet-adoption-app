const express = require('express')
const router = express.Router()
const upload = require('../utils/multer')


import { addPets, getAllPets, getPet, searchPet, updatePet, adoptFoster, returnPet, savePet, deleteSavedPet } from '../controllers/petController'

import { validationSchema } from '../middleware/validationSchema'
import { auth } from '../middleware/auth'
import { isAdmin, isPublic } from '../middleware/isAdmin'


import { schemaPet } from '../schema/schemaPet'


router.post('/addPet', auth, isAdmin, upload.single('image'), schemaPet, validationSchema, addPets)
      .post('/adoptFoster/:id/', auth, isPublic, adoptFoster)
      .post('/returnPet/:id', auth, isPublic, returnPet)
      .post('/savedPet/:id', auth, isPublic, savePet)

router.get('/getAllPets', getAllPets)
      .get('/getPet/:id', auth, getPet)
      .get('/searchPet', searchPet)

//validationPet
router.put('/updatePet/:id', auth, isAdmin, upload.single('image'), schemaPet, validationSchema, updatePet)

router.delete('/deleteSavedPet/:id', auth, isPublic, deleteSavedPet)


module.exports = router


