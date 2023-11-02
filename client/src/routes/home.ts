import { Router } from "express";
import HomeController from "../Controllers/HomeController";

const router = Router();

// Домашная страница

router.get("/", HomeController.index);

export default router;
