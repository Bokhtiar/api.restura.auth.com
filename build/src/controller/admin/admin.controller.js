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
exports.show = exports.login = exports.register = exports.index = void 0;
const mongoose_1 = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const helper_1 = require("../../helper");
const admin_services_1 = require("../../../src/services/admin/admin.services");
/* List of resources */
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const total = yield admin_services_1.adminAuthService.countDocument();
        const results = yield admin_services_1.adminAuthService.findAll();
        res.status(200).json(yield (0, helper_1.HttpSuccessResponse)({
            status: true,
            message: "Admin list.",
            data: results,
        }));
    }
    catch (error) {
        if (error) {
            console.log(error);
            next(error);
        }
    }
});
exports.index = index;
/* store documents */
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, location, role, password } = req.body;
        /* email exist */
        const emailExist = yield admin_services_1.adminAuthService.findOneByKey({ email });
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
        const phoneExist = yield admin_services_1.adminAuthService.findOneByKey({ phone });
        if (phoneExist) {
            return res.status(409).json(yield (0, helper_1.HttpErrorResponse)({
                status: false,
                errors: [
                    {
                        field: "Phone",
                        message: "Phone already exist.",
                    },
                ],
            }));
        }
        /* Has password  */
        const hashPassword = yield bcrypt.hash(password, 10);
        const documents = {
            name,
            email,
            phone,
            location,
            role,
            password: hashPassword,
        };
        yield admin_services_1.adminAuthService.storeDocument({ documents });
        res.status(201).json(yield (0, helper_1.HttpSuccessResponse)({
            status: true,
            message: "Admin created.",
        }));
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.register = register;
/* admin login */
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        /* check email */
        const account = yield admin_services_1.adminAuthService.findOneByKey({ email });
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
/* specific resource show */
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield admin_services_1.adminAuthService.findOneByID({ _id: new mongoose_1.Types.ObjectId(id) });
        res.status(200).json({
            status: true,
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.show = show;
