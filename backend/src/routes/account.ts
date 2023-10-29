import { Router } from "express";
import { AuthMiddleware } from "../Middlewares/AuthMiddleware";
import AccountController from "../Controllers/AccountController";

const router = Router();

router.get("/", AuthMiddleware, AccountController.index);

export default router;
