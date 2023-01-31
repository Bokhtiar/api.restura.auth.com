"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const admin_routes_1 = require("./admin.routes");
exports.adminRouter = (0, express_1.Router)();
exports.adminRouter.use("/", admin_routes_1.adminRouters);
