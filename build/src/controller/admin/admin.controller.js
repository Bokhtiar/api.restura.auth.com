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
exports.show = exports.store = exports.index = void 0;
const admin_services_1 = require("../../../src/services/admin/admin.services");
const helper_1 = require("../../helper");
const mongoose_1 = require("mongoose");
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
const store = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* email exist */
        const { name, email, phone, location, role, password } = req.body;
        const documents = {
            name,
            email,
            phone,
            location,
            role,
            password,
        };
        yield admin_services_1.adminAuthService.storeDocument({ documents });
        res.status(201).json(yield (0, helper_1.HttpSuccessResponse)({
            status: true,
            message: "Changes saved.",
        }));
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.store = store;
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
