import { Types } from "mongoose";
import {
  IAdmin,
  IAdminCreateUpdate,
} from "../../../src/types/admin/admin.types";
import { Models } from "../../models";

/* count all document */
const countDocument = async (): Promise<number> => {
  return Models.Admin.countDocuments();
};

/* find all */
const findAll = async (): Promise<IAdmin[] | []> => {
  return await Models.Admin.find();
};

/* store documents */
const storeDocument = async ({
  documents,
}: {
  documents: IAdminCreateUpdate;
}): Promise<IAdmin | null> => {
  const newAdmin = new Models.Admin({
    ...documents,
  });
  return await newAdmin.save();
};

/* findoneByID */
const findOneByID = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<IAdmin | null> => {
  return await Models.Admin.findOne({ _id });
};

/* findOneByKey */
const findOneByKey = async (params: any): Promise<IAdmin | null> => {
  return await Models.Admin.findOne({ ...params });
};

/* findOneByID Destroy */
const findOneAndDelete = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<IAdmin | null> => {
  return await Models.Admin.findByIdAndDelete({ _id });
};

/* profile me */
const profile = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<IAdmin | null> => {
  return await Models.Admin.findById(_id);
};

export const adminAuthService = {
  findAll,
  profile,
  findOneByID,
  findOneByKey,
  countDocument,
  storeDocument,
  findOneAndDelete,
};
