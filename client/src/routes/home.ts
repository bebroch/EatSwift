import { Router } from "express";
import HomeController from "../Controllers/HomeController";

const router = Router();

// Домашняя страница

router.get("/", HomeController.index);

export default router;
