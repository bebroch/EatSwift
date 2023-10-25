import { Router } from "express";
import { AuthMiddleware } from "../Middlewares/AuthMiddleware";
import AuthController from "../Controllers/AuthController";

const router = Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

export default router;
