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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.Pets = exports.Pet = void 0;
var petDB = require('../models/petsModel');
var userDB = require('../models/usersModel');
var _ = require('lodash');
var Pet = /** @class */ (function () {
    function Pet(type, name, picture, height, weight, color, bio, hypoallergenic, dietaryRestriction, breed, cloudinary_id) {
        this.type = type;
        this.name = name;
        this.picture = picture;
        this.height = height;
        this.weight = weight;
        this.color = color;
        this.bio = bio;
        this.hypoallergenic = hypoallergenic;
        this.dietaryRestriction = dietaryRestriction;
        this.breed = breed;
        this.cloudinary_id = cloudinary_id;
    }
    return Pet;
}());
exports.Pet = Pet;
var Pets = /** @class */ (function () {
    function Pets() {
    }
    Pets.prototype.addPet = function (newPet) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, petDB.create(newPet)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Pets.prototype.readPets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, petDB.find()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_2 = _a.sent();
                        console.log(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Pets.prototype.findPetById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var findPet, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, petDB.findById("" + id)];
                    case 1:
                        findPet = _a.sent();
                        return [2 /*return*/, findPet];
                    case 2:
                        e_3 = _a.sent();
                        console.log(e_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Pets.prototype.searchPet = function (searchPet) {
        return __awaiter(this, void 0, void 0, function () {
            var query, result, regex_1, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        query = _(searchPet).omit(_.isUndefined, _.isNull, "minheight", "maxheight", "minweight", "maxweight", "name").value();
                        return [4 /*yield*/, petDB.find(query, { createdAt: 0, updatedAt: 0, __v: 0 })];
                    case 1:
                        result = _a.sent();
                        regex_1 = new RegExp("^" + searchPet.name);
                        if (searchPet.name)
                            result = result.filter(function (pet) { return regex_1.test(pet.name); });
                        if (searchPet.minheight)
                            result = result.filter(function (pet) { return searchPet.minheight <= pet.height; });
                        if (searchPet.maxheight)
                            result = result.filter(function (pet) { return searchPet.maxheight >= pet.height; });
                        if (searchPet.minweight)
                            result = result.filter(function (pet) { return searchPet.minweight <= pet.weight; });
                        if (searchPet.maxweight)
                            result = result.filter(function (pet) { return searchPet.maxweight >= pet.weight; });
                        return [2 /*return*/, result];
                    case 2:
                        e_4 = _a.sent();
                        console.log(e_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Pets.prototype.updatePet = function (id, updatePet) {
        return __awaiter(this, void 0, void 0, function () {
            var e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, petDB.findByIdAndUpdate("" + id, updatePet)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_5 = _a.sent();
                        console.log(e_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Pets.prototype.adoptFoster = function (idPet, userID, status) {
        return __awaiter(this, void 0, void 0, function () {
            var findPet, user, adoptedFosterPets, pets, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        return [4 /*yield*/, this.findPetById(idPet)];
                    case 1:
                        findPet = _a.sent();
                        findPet.status = status;
                        return [4 /*yield*/, petDB.findByIdAndUpdate("" + idPet, findPet)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, userDB.findById("" + userID)];
                    case 3:
                        user = _a.sent();
                        if (!(findPet.status !== 'Available')) return [3 /*break*/, 7];
                        if (!!user.adoptedFosterPets.includes(idPet)) return [3 /*break*/, 5];
                        adoptedFosterPets = __spreadArrays(user.adoptedFosterPets, [idPet]);
                        user.adoptedFosterPets = adoptedFosterPets;
                        return [4 /*yield*/, userDB.findByIdAndUpdate("" + userID, user, { "new": true, upsert: true })];
                    case 4:
                        user = _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, petDB.find()];
                    case 6:
                        pets = _a.sent();
                        return [2 /*return*/, { user: user, pets: pets }];
                    case 7: throw new Error('There is an error');
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        e_6 = _a.sent();
                        return [2 /*return*/, e_6];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    Pets.prototype.returnPet = function (idPet, userID) {
        return __awaiter(this, void 0, void 0, function () {
            var findPet, findUser, user, pets, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        return [4 /*yield*/, this.findPetById(idPet)];
                    case 1:
                        findPet = _a.sent();
                        findPet.status = 'Available';
                        return [4 /*yield*/, petDB.findByIdAndUpdate("" + idPet, findPet)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, userDB.findById("" + userID)];
                    case 3:
                        findUser = _a.sent();
                        if (!findUser.adoptedFosterPets.includes(idPet)) return [3 /*break*/, 6];
                        findUser.adoptedFosterPets = findUser.adoptedFosterPets.filter(function (pet) { return pet !== idPet; });
                        return [4 /*yield*/, userDB.findByIdAndUpdate("" + userID, findUser, { "new": true, upsert: true })];
                    case 4:
                        user = _a.sent();
                        return [4 /*yield*/, petDB.find()];
                    case 5:
                        pets = _a.sent();
                        return [2 /*return*/, { user: user, pets: pets }];
                    case 6: throw new Error('Something wrong in this this pet');
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        e_7 = _a.sent();
                        return [2 /*return*/, e_7];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    Pets.prototype.savePet = function (idPet, userID) {
        return __awaiter(this, void 0, void 0, function () {
            var findUser, user, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, userDB.findById("" + userID)];
                    case 1:
                        findUser = _a.sent();
                        if (!!findUser.savedPets.includes(idPet)) return [3 /*break*/, 3];
                        return [4 /*yield*/, userDB.findByIdAndUpdate("" + userID, { $push: { savedPets: idPet } }, { "new": true, upsert: true })];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 3: throw new Error('You have already saved this pet');
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_8 = _a.sent();
                        return [2 /*return*/, e_8];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Pets.prototype.deleteSavedPet = function (idPet, userID) {
        return __awaiter(this, void 0, void 0, function () {
            var findUser, findUser_1, e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, userDB.findById("" + userID)];
                    case 1:
                        findUser = _a.sent();
                        if (!findUser.savedPets.includes(idPet)) return [3 /*break*/, 3];
                        return [4 /*yield*/, userDB.findByIdAndUpdate("" + userID, { $pull: { savedPets: { $in: [idPet] } } }, { "new": true, upsert: true })];
                    case 2:
                        findUser_1 = _a.sent();
                        return [2 /*return*/, findUser_1];
                    case 3: throw new Error('Something wrong in this this pet');
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_9 = _a.sent();
                        return [2 /*return*/, e_9];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return Pets;
}());
exports.Pets = Pets;
