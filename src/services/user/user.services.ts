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

  /* password filed updated */
  const _id: any = account?._id;
  return await Models.User.findByIdAndUpdate(_id, {
    $set: { password: hashPassword },
  });
};

/* change password */

type changePasswordTypes = {
  email: string;
  oldPassword: string;
  newPassword: string;
};

export const changePassword = async ({
  document,
}: {
  document: changePasswordTypes;
}): Promise<any> => {
  const email = document.email;

  const account = await Models.User.findOne({ email });
  const _id = account?._id;

  /* old password and current password cheeck */
  if (await bcrypt.compare(document.oldPassword, account?.password)) {
    /* existing password and newpassword != check  */
    if (!(await bcrypt.compare(document.newPassword, account?.password))) {
      /* haspaword */
      const hashPassword = await bcrypt.hash(`${document.newPassword}`, 10);
      /* password field updated */
      await Models.User.findByIdAndUpdate(account?._id, {
        $set: { password: hashPassword },
      });
      return "Password changed."
    } else {
      return "Already exist this password";
    }
  } else {
    return "Incurrect your old password";
  }

};

export const userAuthService = {
  findOneById,
  findOneByKey,
  storeDocument,
  ResetAccount,
  changePassword,
};
