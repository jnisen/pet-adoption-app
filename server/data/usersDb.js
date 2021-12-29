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
exports.Users = exports.User = void 0;
var UserDB = require('../models/usersModel');
var petDB = require('../models/petsModel');
var User = /** @class */ (function () {
    function User(firstName, lastName, email, password, confirmPassword, phoneNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.phoneNumber = phoneNumber;
    }
    return User;
}());
exports.User = User;
var Users = /** @class */ (function () {
    function Users() {
    }
    Users.prototype.addUser = function (newUser) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UserDB.create(newUser)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Users.prototype.getUserPetsById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var findUser, adoptedFosterpets, savedPets, userAndPets, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, UserDB.findById("" + id, { _id: 0, createdDate: 0, __v: 0, role: 0 })];
                    case 1:
                        findUser = _a.sent();
                        return [4 /*yield*/, petDB.find({ _id: { $in: findUser.adoptedFosterPets } })];
                    case 2:
                        adoptedFosterpets = _a.sent();
                        return [4 /*yield*/, petDB.find({ _id: { $in: findUser.savedPets } })];
                    case 3:
                        savedPets = _a.sent();
                        userAndPets = {
                            user: findUser,
                            adoptedFosterpets: adoptedFosterpets,
                            savedPets: savedPets
                        };
                        return [2 /*return*/, userAndPets];
                    case 4:
                        e_2 = _a.sent();
                        console.log(e_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Users.prototype.getUserByID = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var findUser, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UserDB.findById("" + id, { _id: 0, createdDate: 0, __v: 0, role: 0 })];
                    case 1:
                        findUser = _a.sent();
                        return [2 /*return*/, findUser];
                    case 2:
                        e_3 = _a.sent();
                        console.log(e_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Users.prototype.readUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UserDB.find({}, { password: 0, confirmPassword: 0, createdDate: 0, __v: 0 })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_4 = _a.sent();
                        console.log(e_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Users.prototype.findUserByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var findUser, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UserDB.findOne({ email: email })];
                    case 1:
                        findUser = _a.sent();
                        return [2 /*return*/, findUser];
                    case 2:
                        e_5 = _a.sent();
                        console.log(e_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Users.prototype.updateUser = function (id, updateUser) {
        return __awaiter(this, void 0, void 0, function () {
            var e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UserDB.findByIdAndUpdate("" + id, updateUser, { upsert: true, "new": true })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_6 = _a.sent();
                        console.log(e_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Users.prototype.userToAdmin = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UserDB.findByIdAndUpdate("" + id, { $unset: { savedPets: "", adoptedFosterPets: "" } }, { upsert: true, "new": true })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_7 = _a.sent();
                        console.log(e_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Users.prototype.getUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var findUser, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserDB.findById("" + id, { firstName: 1, lastName: 1, _id: 1, role: 1 })];
                    case 1:
                        findUser = _a.sent();
                        user = {
                            firstName: findUser.firstName,
                            lastName: findUser.lastName,
                            userId: findUser._id.toString(),
                            role: findUser.role
                        };
                        return [2 /*return*/, user];
                }
            });
        });
    };
    return Users;
}());
exports.Users = Users;
