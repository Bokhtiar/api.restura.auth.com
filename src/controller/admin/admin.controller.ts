import { Types } from "mongoose";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
import { HttpErrorResponse, HttpSuccessResponse } from "../../helper";
import { IAdminCreateUpdate } from "../../../src/types/admin/admin.types";
import { adminAuthService } from "../../../src/services/admin/admin.services";

/* List of resources */
export const index = async (
  req: Request,
  res: Response, 
  next: NextFunction
) => {
  try {
    const total = await adminAuthService.countDocument();
    const results = await adminAuthService.findAll();

    res.status(200).json(
      await HttpSuccessResponse({
        status: true,
        message: "Admin list.",
        data: results,
      })
    );

  } catch (error: any) {
    if (error) {
      console.log(error);
      next(error);
    }
  }
};

/* store documents */
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, phone, location, role, password } = req.body;

    /* email exist */
    const emailExist = await adminAuthService.findOneByKey({ email })
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
    const phoneExist = await adminAuthService.findOneByKey({ phone })
    if (phoneExist) {
      return res.status(409).json(
        await HttpErrorResponse({
          status: false,
          errors: [
            {
              field: "Phone",
              message: "Phone already exist.",
            },
          ],
        })
      );
    }

    /* Has password  */
    const hashPassword = await bcrypt.hash(password, 10);

    const documents: IAdminCreateUpdate = {
      name,
      email,
      phone,
      location,
      role,
      password: hashPassword,
    };

    await adminAuthService.storeDocument({ documents });

    res.status(201).json(
      await HttpSuccessResponse({
        status: true,
        message: "Admin created.",
      })
    );

  } catch (error: any) {
    console.log(error);
    next(error);
  }
};

/* admin login */
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    
    /* check email */
    const account = await adminAuthService.findOneByKey({ email })
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

/* specific resource show */
export const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await adminAuthService.findOneByID({ _id: new Types.ObjectId(id) });

    res.status(200).json({
      status: true,
      data: result,
    });

  } catch (error: any) {
    console.log(error);
    next(error);
  }
};
