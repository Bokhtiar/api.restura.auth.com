const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import { HttpErrorResponse } from "../../../src/helper";
import { Request, Response, NextFunction } from "express";
import { IUserCreateUpdate } from "../../../src/types/user/user.types";
import { userAuthService } from "../../../src/services/user/user.services";

/* resource list */
export const index = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const results = await userAuthService.findAll()

        res.status(200).json({
            status: true,
            data: results,
        })

    } catch (error: any) {
        console.log(error);
        next(error)
    }
}

/* login */
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body

        /* check email */
        const account = await userAuthService.findOneByKey({ email })
        if (!account) {
            return res.status(409).json(
                await HttpErrorResponse({
                    status: false,
                    errors: [
                        {
                            field: "email",
                            message: "Invalid email or password.",
                        },
                    ],
                })
            );
        }

        /* compare with password */
        const result = await bcrypt.compare(password, account?.password);
        if (!result) {
            return res.status(404).json({
                status: false,
                message: "Invalid email or password.",
            });
        }

        /* Generate JWT token */
        const token = await jwt.sign(
            {
                id: account?._id,
                name: account?.name,
                role: account?.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            status: true,
            token: token,
        });

    } catch (error: any) {
        console.log(error);
        next(error)
    }
}

/* RegisterDocument */
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, phone, location, role, password } = req.body

        /* email exist */
        const emailExist = await userAuthService.findOneByKey({ email })
        if (emailExist) {
            return res.status(409).json(
                await HttpErrorResponse({
                    status: false,
                    errors: [
                        {
                            field: "email",
                            message: "Email already exist.",
                        },
                    ],
                })
            );
        }

        /* phone exist */
        const phoneExist = await userAuthService.findOneByKey({ phone })
        if (phoneExist) {
            return res.status(409).json(
                await HttpErrorResponse({
                    status: false,
                    errors: [
                        {
                            field: "phone",
                            message: "Phone already exist.",
                        },
                    ],
                })
            );
        }

        /* Has password  */
        const hashPassword = await bcrypt.hash(password, 10);

        const documents: IUserCreateUpdate = {
            name, email, phone, location, role, password: hashPassword
        }

        await userAuthService.storeDocument({ documents })

        res.status(201).json({
            status: true,
            message: "User created."
        })

    } catch (error: any) {
        console.log(error);
        next(error)
    }
}
