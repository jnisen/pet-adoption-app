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
exports.answerMessage = exports.getMessage = exports.getMessages = exports.addMessage = void 0;
require('dotenv').config();
var contactDb_1 = require("../data/contactDb");
var contacts = new contactDb_1.Contacts();
function addMessage(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, _a, name, email, message, subject, contact, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    _a = req.body, name = _a.name, email = _a.email, message = _a.message, subject = _a.subject;
                    contact = new contactDb_1.Contact(name, email, message, subject);
                    return [4 /*yield*/, contacts.addMessage(contact, id)];
                case 1:
                    _b.sent();
                    res.send('Messages Sent');
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
exports.addMessage = addMessage;
function getMessages(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var messages, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, contacts.getMessages()];
                case 1:
                    messages = _a.sent();
                    res.send({ messages: messages });
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
exports.getMessages = getMessages;
function getMessage(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, message, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    return [4 /*yield*/, contacts.getMessage(id)];
                case 1:
                    message = _a.sent();
                    res.send({ message: message });
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
exports.getMessage = getMessage;
function answerMessage(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, message, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = req.params.id;
                    return [4 /*yield*/, contacts.answerMessage(req.body, id)];
                case 1:
                    message = _a.sent();
                    res.send('Message Answered');
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _a.sent();
                    res.status(404).send("" + e_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.answerMessage = answerMessage;
