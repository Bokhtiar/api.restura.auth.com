import { Types } from "mongoose";

export interface IUser {
    _id: Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    location: string;
    role: string;
    password: string;
}

export interface IUserCreateUpdate {
    name: string;
    email: string;
    phone: string;
    location: string;
    role: string;
    password: string;
}