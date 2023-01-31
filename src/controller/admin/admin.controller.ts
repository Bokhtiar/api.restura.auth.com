import { Request, Response, NextFunction } from "express";
import { IAdminCreateUpdate } from "../../../src/types/admin/admin.types";
import { adminAuthService } from "../../../src/services/admin/admin.services";
import { HttpSuccessResponse } from "../../helper";

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
export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('test');
    
    const { name, email, phone, location, role, password } = req.body;
    const documents: IAdminCreateUpdate = {
      name,
      email,
      phone,
      location,
      role,
      password,
    };
    console.log(documents);
    
    await adminAuthService.storeDocument({ documents });
    res.status(200).json(
      await HttpSuccessResponse({
        status: true,
        message: "Changes saved.",
      })
    );
  } catch (error: any) {
    console.log(error);
    next(error);
  }
};
