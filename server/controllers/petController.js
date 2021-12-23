"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.deleteSavedPet = exports.savePet = exports.returnPet = exports.adoptFoster = exports.updatePet = exports.searchPet = exports.getPet = exports.getAllPets = exports.addPets = void 0;
var petsDb_1 = require("../data/petsDb");
var pets = new petsDb_1.Pets();
var cloudinary = require('../config/cloudinary');
function addPets(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result, _a, type, name, height, weight, color, bio, hypoallergenic, dietaryRestriction, breed, picture, cid, pet, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, cloudinary.uploader.upload(req.file.path)];
                case 1:
                    result = _b.sent();
                    _a = req.body, type = _a.type, name = _a.name, height = _a.height, weight = _a.weight, color = _a.color, bio = _a.bio, hypoallergenic = _a.hypoallergenic, dietaryRestriction = _a.dietaryRestriction, breed = _a.breed;
                    picture = result.secure_url;
                    cid = result.public_id;
                    pet = new petsDb_1.Pet(type, name, picture, height, weight, color, bio, hypoallergenic, dietaryRestriction, breed, cid);
                    return [4 /*yield*/, pets.addPet(pet)];
                case 2:
                    _b.sent();
                    res.send("Pet Added");
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _b.sent();
                    res.status(400).send(e_1.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.addPets = addPets;
function getAllPets(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var petsAll, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, pets.readPets()];
                case 1:
                    petsAll = _a.sent();
                    res.send(petsAll);
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    res.status(404).send(e_2.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAllPets = getAllPets;
function getPet(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, pet, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    return [4 /*yield*/, pets.findPetById(id)];
                case 1:
                    pet = _a.sent();
                    res.send(pet);
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _a.sent();
                    res.status(404).send(e_3.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getPet = getPet;
function searchPet(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, pets.searchPet(req.query)];
                case 1:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _a.sent();
                    res.status(404).send(e_4.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.searchPet = searchPet;
function updatePet(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, pet, result, _a, type, name, height, weight, color, bio, hypoallergenic, dietaryRestriction, breed, petUpdate, e_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    id = req.params.id;
                    return [4 /*yield*/, pets.findPetById(id)];
                case 1:
                    pet = _b.sent();
                    return [4 /*yield*/, cloudinary.uploader.destroy(pet.cloudinary_id)];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, cloudinary.uploader.upload(req.file.path)];
                case 3:
                    result = _b.sent();
                    _a = req.body, type = _a.type, name = _a.name, height = _a.height, weight = _a.weight, color = _a.color, bio = _a.bio, hypoallergenic = _a.hypoallergenic, dietaryRestriction = _a.dietaryRestriction, breed = _a.breed;
                    pet.name = name;
                    pet.color = color;
                    pet.type = type;
                    pet.weight = weight;
                    pet.breed = breed;
                    pet.hypoallergenic = hypoallergenic;
                    pet.dietaryRestriction = dietaryRestriction;
                    pet.breed = breed;
                    pet.height = height;
                    pet.bio = bio;
                    pet.picture = result.secure_url;
                    pet.cid = result.public_id;
                    return [4 /*yield*/, pets.updatePet(id, pet)];
                case 4:
                    petUpdate = _b.sent();
                    res.send({ pet: petUpdate, message: 'Update Pet' });
                    return [3 /*break*/, 6];
                case 5:
                    e_5 = _b.sent();
                    res.status(404).send(e_5.message);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.updatePet = updatePet;
function adoptFoster(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, status, obj, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    status = req.body.status;
                    return [4 /*yield*/, pets.adoptFoster(id, req.user.userID, status)];
                case 1:
                    obj = _a.sent();
                    res.send({ user: obj.user, pets: obj.pets, message: 'Adopt/foster pet' });
                    return [3 /*break*/, 3];
                case 2:
                    e_6 = _a.sent();
                    res.send(400).message("" + e_6);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.adoptFoster = adoptFoster;
function returnPet(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, obj, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    return [4 /*yield*/, pets.returnPet(id, req.user.userID)];
                case 1:
                    obj = _a.sent();
                    console.log(obj.pets);
                    res.send({ user: obj.user, pets: obj.pets, message: 'return pet' });
                    return [3 /*break*/, 3];
                case 2:
                    e_7 = _a.sent();
                    res.send(400).message("" + e_7);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.returnPet = returnPet;
function savePet(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, user, e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    return [4 /*yield*/, pets.savePet(id, req.user.userID)];
                case 1:
                    user = _a.sent();
                    res.send({ user: user, message: 'Save Pet Success' });
                    return [3 /*break*/, 3];
                case 2:
                    e_8 = _a.sent();
                    res.send(400).message("" + e_8);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.savePet = savePet;
function deleteSavedPet(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, user, e_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    return [4 /*yield*/, pets.deleteSavedPet(id, req.user.userID)];
                case 1:
                    user = _a.sent();
                    res.send({ user: user, message: 'Delete Pet Success' });
                    return [3 /*break*/, 3];
                case 2:
                    e_9 = _a.sent();
                    res.send(400).message("" + e_9);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteSavedPet = deleteSavedPet;
