import { Router } from "express";
import { AuthMiddleware } from "../Middlewares/AuthMiddleware";
import AuthController from "../Controllers/AuthController";
import loginValidation from "../Middlewares/ValidationMiddleware";

const router = Router();

router.post("/login", loginValidation, AuthController.login);
router.post("/register", AuthController.register);

export default router;
