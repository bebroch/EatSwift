import { Router } from "express";
import AuthController from "../Controllers/AuthController";
import loginValidation from "../Middlewares/Validate/Auth/login";
import registerValidation from "../Middlewares/Validate/Auth/register";

const router = Router();

router.post("/login", loginValidation, AuthController.login);
router.post("/register", registerValidation, AuthController.register);

export default router;
