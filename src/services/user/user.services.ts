const bcrypt = require("bcryptjs");
import { Types } from "mongoose";
import { Models } from "../../models";
const nodemailer = require("nodemailer");
import { IUser, IUserCreateUpdate } from "../../../src/types/user/user.types";

/* findOneBykey */
const findOneByKey = async (params: any): Promise<IUser | null> => {
  return await Models.User.findOne({ ...params });
};

/* store document */
const storeDocument = async ({
  documents,
}: {
  documents: IUserCreateUpdate;
}): Promise<IUser | null> => {
  const newUser = new Models.User({
    ...documents,
  });
  return newUser.save();
};

/* findOneByID */
const findOneById = async ({
  _id,
}: {
  _id: Types.ObjectId;
}): Promise<IUser | null> => {
  return await Models.User.findById({ _id });
};

/* reset */
const ResetAccount = async ({
  email,
}: {
  email: string;
}): Promise<IUser | null> => {
  const account = await Models.User.findOne({ email });

  /* rendom password generator */
  function between(min: any, max: any) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  const newPassword = between(99999999, 10000000);

  /* email configration */
  var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "84936e37a64769",
      pass: "55ac826c036ded",
    },
  });

  let message = {
    from: "grapView@email.com",
    to: "bokhtiartoshar1@gmail.com",
    subject: "Password reset from restura.com",
    html: `${newPassword}`,
  };
  transporter.sendMail(message, function (err: any, info: any) {
    if (err) {
      console.log(err);
    } else {
      console.log("email sended");
    }
  });

  /* Has password  */ 
  const hashPassword = await bcrypt.hash(`${newPassword}`, 10);
  console.log("asdf",hashPassword);
   
  /* password filed updated */
  const _id: any = account?._id;
  return await Models.User.findByIdAndUpdate(_id, {
    $set: { password: hashPassword },
  });
};

export const userAuthService = {
  findOneById,
  findOneByKey,
  storeDocument,
  ResetAccount,
};
