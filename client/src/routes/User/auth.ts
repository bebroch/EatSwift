import { Router } from "express";
import AuthController from "../../Controllers/AuthController";
import loginMiddleware from "../../Middlewares/Validate/Auth/loginMiddleware";
import registerMiddleware from "../../Middlewares/Validate/Auth/registerMiddleware";

const router = Router();

router.post("/login", loginMiddleware, AuthController.login);
router.post("/register", registerMiddleware, AuthController.register);

export default router;
