import express from "express";
import * as adminController from '../../controller/admin/admin.controller'
import { adminPermission } from "../../middlewares/admin.permission.middleware";
import { adminRegistrationValidators } from "../../../src/validations/admin/admin.validators";


export const adminRouters = express.Router();

adminRouters.get("/", adminController.index);
adminRouters.post("/", adminRegistrationValidators.Register, adminController.register);
adminRouters.post("/login",adminRegistrationValidators.Login, adminController.login);
adminRouters.get("/:id", adminController.show);
adminRouters.get("/me", adminPermission, adminController.profile); 
adminRouters.delete("/:id", adminController.destroy);   