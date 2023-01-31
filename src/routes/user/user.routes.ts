import express from "express";
import { userPermission } from "../../../src/middlewares/user.permission.middleware";
import * as userController from '../../controller/user/user.controller'

export const userRouters = express.Router()
userRouters.post("/login", userController.login)
userRouters.get("/me", userPermission, userController.me)
userRouters.post("/", userController.register)