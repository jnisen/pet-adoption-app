"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var upload = require('../utils/multer');
var petController_1 = require("../controllers/petController");
var validationSchema_1 = require("../middleware/validationSchema");
var auth_1 = require("../middleware/auth");
var isAdmin_1 = require("../middleware/isAdmin");
var schemaPet_1 = require("../schema/schemaPet");
router.post('/addPet', auth_1.auth, isAdmin_1.isAdmin, upload.single('image'), schemaPet_1.schemaPet, validationSchema_1.validationPet, petController_1.addPets)
    .post('/adoptFoster/:id/', auth_1.auth, isAdmin_1.isPublic, petController_1.adoptFoster)
    .post('/returnPet/:id', auth_1.auth, isAdmin_1.isPublic, petController_1.returnPet)
    .post('/savedPet/:id', auth_1.auth, isAdmin_1.isPublic, petController_1.savePet);
router.get('/getAllPets', petController_1.getAllPets)
    .get('/getPet/:id', auth_1.auth, petController_1.getPet)
    .get('/searchPet', petController_1.searchPet);
//validationPet
router.put('/updatePet/:id', auth_1.auth, isAdmin_1.isAdmin, upload.single('image'), schemaPet_1.schemaPet, validationSchema_1.validationPet, petController_1.updatePet);
router["delete"]('/deleteSavedPet/:id', auth_1.auth, isAdmin_1.isPublic, petController_1.deleteSavedPet);
module.exports = router;
