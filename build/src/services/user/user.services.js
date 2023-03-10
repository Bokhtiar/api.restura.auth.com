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
exports.userAuthService = void 0;
const models_1 = require("../../models");
/* findOneBykey */
const findOneByKey = (params) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Models.User.findOne(Object.assign({}, params));
});
/* store document */
const storeDocument = ({ documents }) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new models_1.Models.User(Object.assign({}, documents));
    return newUser.save();
});
/* findOneByID */
const findOneById = ({ _id }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Models.User.findById({ _id });
});
exports.userAuthService = {
    findOneById,
    findOneByKey,
    storeDocument,
};
