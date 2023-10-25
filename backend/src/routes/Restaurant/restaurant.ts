import { Router } from "express";
import RestaurantController from "../../Controllers/RestaurantController";
import menu from "./menu";

const router = Router();

router.get("/", RestaurantController.index); // Покажет сортированные рестораны
router.get("/{name}", RestaurantController.index); // Покажет ресторан по названию

router.use("/{name}", menu);

export default router;
