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
exports.makeAdmin = exports.getCurrentUser = exports.login = exports.updateUser = exports.getUser = exports.getAllUsers = exports.addUser = void 0;
require('dotenv').config();
var usersDb_1 = require("../data/usersDb");
var users = new usersDb_1.Users();
var admin = process.env.ADMIN;
function addUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, firstName, lastName, email, password, confirmPassword, phoneNumber, user, role, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, password = _a.password, confirmPassword = _a.confirmPassword, phoneNumber = _a.phoneNumber;
                    user = new usersDb_1.User(firstName, lastName, email, password, confirmPassword, phoneNumber);
                    admin.includes(email) ? user.role = 'admin' : user.role = 'public';
                    role = admin.includes(email) ? user.role = 'admin' : user.role = 'public';
                    user.bio = '';
                    if (role === 'public') {
                        user.savedPets = [];
                        user.adoptedFosterPets = [];
                    }
                    return [4 /*yield*/, users.addUser(user)];
                case 1:
                    _b.sent();
                    res.send('User Added');
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _b.sent();
                    res.status(404).send("" + e_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.addUser = addUser;
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var allUsers, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, users.readUsers()];
                case 1:
                    allUsers = _a.sent();
                    res.send(allUsers);
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    res.status(404).send("" + e_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAllUsers = getAllUsers;
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, user, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    return [4 /*yield*/, users.getUserPetsById(id)];
                case 1:
                    user = _a.sent();
                    res.send(user);
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _a.sent();
                    res.status(404).send("" + e_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getUser = getUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, user, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    return [4 /*yield*/, users.updateUser(id, req.body)];
                case 1:
                    user = _a.sent();
                    res.send({ user: user, message: 'Update User' });
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _a.sent();
                    res.status(404).send(e_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.updateUser = updateUser;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var email, findUser, user, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    email = req.body.email;
                    return [4 /*yield*/, users.findUserByEmail(email)];
                case 1:
                    findUser = _a.sent();
                    user = {
                        firstName: findUser.firstName,
                        lastName: findUser.lastName,
                        userId: findUser._id,
                        role: findUser.role
                    };
                    res.send(user);
                    return [3 /*break*/, 3];
                case 2:
                    e_5 = _a.sent();
                    console.log(e_5);
                    res.status(400).send(e_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
function getCurrentUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userID, findUser, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userID = req.user.userID;
                    return [4 /*yield*/, users.getUser(userID)];
                case 1:
                    findUser = _a.sent();
                    res.send(findUser);
                    return [3 /*break*/, 3];
                case 2:
                    e_6 = _a.sent();
                    console.log(e_6);
                    res.status(400).send(e_6);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getCurrentUser = getCurrentUser;
function makeAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, findUser, allUsers, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    id = req.params.id;
                    return [4 /*yield*/, users.getUserByID(id)];
                case 1:
                    findUser = _a.sent();
                    findUser.role = 'admin';
                    return [4 /*yield*/, users.updateUser(id, findUser)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, users.userToAdmin(id)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, users.readUsers()];
                case 4:
                    allUsers = _a.sent();
                    res.send(allUsers);
                    return [3 /*break*/, 6];
                case 5:
                    e_7 = _a.sent();
                    console.log(e_7);
                    res.status(404).send(e_7);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.makeAdmin = makeAdmin;
