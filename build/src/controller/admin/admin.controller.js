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
exports.index = void 0;
const helper_1 = require("../../helper");
/* List of resources */
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = "hi all admin there";
        res.status(200).json(yield (0, helper_1.HttpSuccessResponse)({
            status: true,
            message: "Admin list.",
            data: results,
        }));
    }
    catch (error) {
        if (error) {
            console.log(error);
            next(error);
        }
    }
});
exports.index = index;
