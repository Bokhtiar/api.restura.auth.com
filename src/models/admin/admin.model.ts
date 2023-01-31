import { Schema, model } from "mongoose";
import { IAdminCreateUpdate } from "../../types/admin/admin.types";

const adminScema: Schema = new Schema<IAdminCreateUpdate>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
      default: "admin"
    },
  },
  {
    timestamps: true,
  }
);
export const Admin = model<IAdminCreateUpdate>("Admin", adminScema)