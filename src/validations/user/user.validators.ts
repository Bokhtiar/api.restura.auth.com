import Schema from "async-validator";
import { NextFunction, Request, Response } from "express";

/* Resource login validaor */
const Login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const descriptor = <any>{
        email: {
            type: "string",
            required: true,
            message: "Email is required.",
        },
        password: {
            type: "string",
            required: true,
            message: "Password is required.",
        },
    };

    /* Execute the validator */
    const validator = new Schema(descriptor);

    validator.validate({ ...req.body }, (errors: any) => {
        if (errors) {
            return res.status(422).json({
                status: false,
                errors,
            });
        }
        next();
    });
};

/* Resource registration validaor */
const Register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const descriptor = <any>{
        name: {
            type: "string",
            required: true,
            message: "Name is required.",
        },
        email: {
            type: "string",
            required: true,
            message: "Email is required.",
        },
        password: {
            type: "string",
            required: true,
            message: "Password is required.",
        },
        phone: {
            type: "string",
            required: true,
            message: "Phone is required.",
        },
    };

    /* Execute the validator */
    const validator = new Schema(descriptor);

    validator.validate({ ...req.body }, (errors: any) => {
        if (errors) {
            return res.status(422).json({
                status: false,
                errors,
            });
        }
        next();
    });
};

export const adminRegistrationValidators = {
    Register,
    Login
};
