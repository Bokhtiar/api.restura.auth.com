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

export const adminAuthService = {
  countDocument,
  findAll,
  storeDocument,
};
