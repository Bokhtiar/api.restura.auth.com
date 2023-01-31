import express from "express";
import { adminRegistrationValidators } from "../../../src/validations/admin/admin.validators";
import * as adminController from '../../controller/admin/admin.controller'

export const adminRouters = express.Router();

adminRouters.get("/", adminController.index);
adminRouters.post("/", adminRegistrationValidators.Register, adminController.register);
adminRouters.post("/login",adminRegistrationValidators.Login, adminController.login);
adminRouters.get("/:id", adminController.show);
adminRouters.delete("/:id", adminController.destroy);