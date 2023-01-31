"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Models = void 0;
const admin_model_1 = require("./admin/admin.model");
const user_models_1 = require("./user/user.models");
exports.Models = {
    Admin: admin_model_1.Admin,
    User: user_models_1.User
};
