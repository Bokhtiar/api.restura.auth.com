import express from "express";
import * as userController from "../../controller/user/user.controller";
import { userPermission } from "../../../src/middlewares/user.permission.middleware";

export const userRouters = express.Router();

userRouters.post("/login", userController.login);
userRouters.post("/", userController.register);
userRouters.get("/me", userPermission, userController.me);
userRouters.post("/reset", userController.Reset);
