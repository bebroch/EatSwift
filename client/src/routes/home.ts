import { Router } from "express";
import HomeController from "../Controllers/HomeController";

const router = Router();

router.get("/", HomeController.index);

export default router;
