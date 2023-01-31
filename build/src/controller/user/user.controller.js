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
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.me = exports.login = void 0;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const helper_1 = require("../../../src/helper");
const user_services_1 = require("../../../src/services/user/user.services");
const mongoose_1 = require("mongoose");
/* login */
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        /* check email */
        const account = yield user_services_1.userAuthService.findOneByKey({ email });
        if (!account) {
            return res.status(409).json(yield (0, helper_1.HttpErrorResponse)({
                status: false,
                errors: [
                    {
                        field: "email",
                        message: "Invalid email or password.",
                    },
                ],
            }));
        }
        /* compare with password */
        const result = yield bcrypt.compare(password, account === null || account === void 0 ? void 0 : account.password);
        if (!result) {
            return res.status(404).json({
                status: false,
                message: "Invalid email or password.",
            });
        }
        /* Generate JWT token */
        const token = yield jwt.sign({
            id: account === null || account === void 0 ? void 0 : account._id,
            name: account === null || account === void 0 ? void 0 : account.name,
            role: account === null || account === void 0 ? void 0 : account.role,
        }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(200).json({
            status: true,
            token: token,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.login = login;
/* me */
const me = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        const result = yield user_services_1.userAuthService.findOneById({ _id: new mongoose_1.Types.ObjectId(id) });
        res.status(200).json({
            status: true,
            message: "profile",
            data: result
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.me = me;
/* RegisterDocument */
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, location, role, password } = req.body;
        /* email exist */
        const emailExist = yield user_services_1.userAuthService.findOneByKey({ email });
        if (emailExist) {
            return res.status(409).json(yield (0, helper_1.HttpErrorResponse)({
                status: false,
                errors: [
                    {
                        field: "email",
                        message: "Email already exist.",
                    },
                ],
            }));
        }
        /* phone exist */
        const phoneExist = yield user_services_1.userAuthService.findOneByKey({ phone });
        if (phoneExist) {
            return res.status(409).json(yield (0, helper_1.HttpErrorResponse)({
                status: false,
                errors: [
                    {
                        field: "phone",
                        message: "Phone already exist.",
                    },
                ],
            }));
        }
        /* Has password  */
        const hashPassword = yield bcrypt.hash(password, 10);
        const documents = {
            name, email, phone, location, role, password: hashPassword
        };
        yield user_services_1.userAuthService.storeDocument({ documents });
        res.status(201).json({
            status: true,
            message: "User created."
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.register = register;
