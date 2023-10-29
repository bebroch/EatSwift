import { Router } from "express";
import AuthController from "../Controllers/AuthController";
import { loginValidation, registerValidation } from "../Middlewares/ValidationMiddleware";

const router = Router();

router.post("/login", loginValidation, AuthController.login);
router.post("/register", registerValidation, AuthController.register);

export default router;
