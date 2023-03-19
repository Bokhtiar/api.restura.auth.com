import { Router } from "express";
import { adminRouters } from "./admin/admin.routes";
import { userRouters } from "./user/user.routes";

export const router: Router = Router();

router.use("/admin", adminRouters);
router.use("/user", userRouters);
