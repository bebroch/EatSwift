import { Router } from "express";
import { AuthMiddleware } from "../Middlewares/AuthMiddleware";

const router = Router();

router.get("/", AuthMiddleware);

export default router;
