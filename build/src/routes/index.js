"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const admin_routes_1 = require("./admin/admin.routes");
const user_routes_1 = require("./user/user.routes");
exports.router = (0, express_1.Router)();
exports.router.use("/admin", admin_routes_1.adminRouters);
exports.router.use("/user", user_routes_1.userRouters);
