import { Router } from "express";
import {adminRouters} from '../routes/admin/admin.routes'

export const router: Router = Router();

router.use("/admin", adminRouters);
  