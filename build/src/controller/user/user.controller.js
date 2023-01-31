"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const helper_1 = require("../../../src/helper");
const user_services_1 = require("../../../src/services/user/user.services");
/* storeDocument */
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, location, role, password } = req.body;
        /* email exist */
        const emailExist = yield user_services_1.userAuthService.findOneByKey({ email });
        if (emailExist) {
            return res.status(409).json(yield (0, helper_1.HttpErrorResponse)({
                status: false,
                errors: [
                    {
                        field: "email",
                        message: "Email already exist.",
                    },
                ],
            }));
        }
        /* phone exist */
        const phoneExist = yield user_services_1.userAuthService.findOneByKey({ phone });
        if (phoneExist) {
            return res.status(409).json(yield (0, helper_1.HttpErrorResponse)({
                status: false,
                errors: [
                    {
                        field: "phone",
                        message: "Phone already exist.",
                    },
                ],
            }));
        }
        const documents = {
            name, email, phone, location, role, password
        };
        yield user_services_1.userAuthService.storeDocument({ documents });
        res.status(200).json({
            status: true,
            message: "User created."
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.register = register;
