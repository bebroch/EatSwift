import { RequestHandler, Router } from "express";
import auth from "./User/auth";
import { AuthMiddleware } from "../Middlewares/AuthMiddleware";
import profile from "./User/profile";

const router = Router();

router.use("/auth", auth);

router.use("/:login", AuthMiddleware as RequestHandler, profile);

export default router;
