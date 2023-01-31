import express from "express";
import * as adminController from '../../controller/admin/admin.controller'

export const adminRouters = express.Router();

adminRouters.get("/", adminController.index);
adminRouters.post("/", adminController.register);
adminRouters.post("/login", adminController.login);
adminRouters.get("/:id", adminController.show);