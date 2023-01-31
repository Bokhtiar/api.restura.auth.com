import { Request, Response, NextFunction } from "express";
import { HttpSuccessResponse } from "../../helper";

/* List of resources */
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results = "hi all admin there";
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
