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
exports.adminAuthService = void 0;
const models_1 = require("../../models");
/* count all document */
const countDocument = () => __awaiter(void 0, void 0, void 0, function* () {
    return models_1.Models.Admin.countDocuments();
});
/* find all */
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Models.Admin.find();
});
/* store documents */
const storeDocument = ({ documents, }) => __awaiter(void 0, void 0, void 0, function* () {
    const newAdmin = new models_1.Models.Admin(Object.assign({}, documents));
    return yield newAdmin.save();
});
/* findoneByID */
const findOneByID = ({ _id, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Models.Admin.findOne({ _id });
});
/* findOneByKey */
const findOneByKey = (params) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Models.Admin.findOne(Object.assign({}, params));
});
/* findOneByID Destroy */
const findOneAndDelete = ({ _id, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Models.Admin.findByIdAndDelete({ _id });
});
/* profile me */
const profile = ({ _id, }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Models.Admin.findById(_id);
});
exports.adminAuthService = {
    findAll,
    profile,
    findOneByID,
    findOneByKey,
    countDocument,
    storeDocument,
    findOneAndDelete,
};
