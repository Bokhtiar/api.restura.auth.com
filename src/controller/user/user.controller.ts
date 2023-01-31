import { Request, Response, NextFunction } from "express";
import { IUserCreateUpdate } from "../../../src/types/user/user.types";
import { HttpErrorResponse } from "../../../src/helper";
import { userAuthService } from "../../../src/services/user/user.services";

/* storeDocument */
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

        const documents: IUserCreateUpdate = {
            name, email, phone, location, role, password
        }

        await userAuthService.storeDocument({ documents })

        res.status(200).json({
            status: true,
            message: "User created."
        })

    } catch (error: any) {
        console.log(error);
        next(error)
    }
}
