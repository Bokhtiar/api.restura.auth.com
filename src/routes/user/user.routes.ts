import express from "express";
import * as userController from '../../controller/user/user.controller'

export const userRouters = express.Router()
userRouters.get("/", userController.index)
userRouters.post("/login", userController.login)
userRouters.post("/", userController.register)