import { Types } from "mongoose";

export interface IAdmin {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  location: string;
  password: string;
  role: string;
}

export interface IAdminCreateUpdate {
  name: string;
  email: string;
  phone: string;
  location: string;
  password: string;
  role: string;
}
