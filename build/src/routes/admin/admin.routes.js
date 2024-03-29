"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouters = void 0;
const express_1 = __importDefault(require("express"));
const adminController = __importStar(require("../../controller/admin/admin.controller"));
const admin_permission_middleware_1 = require("../../middlewares/admin.permission.middleware");
const admin_validators_1 = require("../../../src/validations/admin/admin.validators");
exports.adminRouters = express_1.default.Router();
exports.adminRouters.get("/", adminController.index);
exports.adminRouters.post("/", admin_validators_1.adminRegistrationValidators.Register, adminController.register);
exports.adminRouters.post("/login", admin_validators_1.adminRegistrationValidators.Login, adminController.login);
exports.adminRouters.get("/:id", adminController.show);
exports.adminRouters.get("/me", admin_permission_middleware_1.adminPermission, adminController.profile);
exports.adminRouters.delete("/:id", adminController.destroy);
