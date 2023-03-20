"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthService = exports.changePassword = void 0;
const bcrypt = require("bcryptjs");
const models_1 = require("../../models");
const nodemailer = require("nodemailer");
/* findOneBykey */
const findOneByKey = (params) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Models.User.findOne(Object.assign({}, params));
});
/* store document */
const storeDocument = ({ documents, }) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new models_1.Models.User(Object.assign({}, documents));
    return newUser.save();
});
/* findOneByID */
const findOneById = ({ _id, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Models.User.findById({ _id });
});
/* reset */
const ResetAccount = ({ email, }) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield models_1.Models.User.findOne({ email });
    /* rendom password generator */
    function between(min, max) {
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
    transporter.sendMail(message, function (err, info) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("email sended");
        }
    });
    /* Has password  */
    const hashPassword = yield bcrypt.hash(`${newPassword}`, 10);
    /* password filed updated */
    const _id = account === null || account === void 0 ? void 0 : account._id;
    return yield models_1.Models.User.findByIdAndUpdate(_id, {
        $set: { password: hashPassword },
    });
});
const changePassword = ({ document, }) => __awaiter(void 0, void 0, void 0, function* () {
    const email = document.email;
    const account = yield models_1.Models.User.findOne({ email });
    /* old password and current password cheeck */
    if (yield bcrypt.compare(document.oldPassword, account === null || account === void 0 ? void 0 : account.password)) {
        /* existing password and newpassword != check  */
        if (!(yield bcrypt.compare(document.newPassword, account === null || account === void 0 ? void 0 : account.password))) {
            /* haspaword */
            const hashPassword = yield bcrypt.hash(`${document.newPassword}`, 10);
            /* password field updated */
            yield models_1.Models.User.findByIdAndUpdate(account === null || account === void 0 ? void 0 : account._id, {
                $set: { password: hashPassword },
            });
            return "Password changed.";
        }
        else {
            return "Already exist this password";
        }
    }
    else {
        return "Incurrect your old password";
    }
});
exports.changePassword = changePassword;
exports.userAuthService = {
    findOneById,
    findOneByKey,
    ResetAccount,
    storeDocument,
    changePassword: exports.changePassword,
};
