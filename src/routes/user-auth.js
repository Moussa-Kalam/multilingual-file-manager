import { Router } from "express";
import * as userAuthControler from "../controllers/user-auth.js";

const router = Router();

router.post("/login", userAuthControler.login);

export default router;
