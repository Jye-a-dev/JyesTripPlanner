import { Router } from "express";
import validateMiddleware from "../../middlewares/validate.middleware";
import { authMiddleware } from "./auth.middleware";
import authController from "./auth.controller";
import { loginSchema, registerSchema } from "./auth.validator";

const router = Router();

router.post("/register", validateMiddleware(registerSchema), authController.register);
router.post("/login", validateMiddleware(loginSchema), authController.login);
router.post("/logout", authController.logout);
router.get("/me", authMiddleware, authController.me);

export default router;
