import { Router } from "express";
import RestaurantController from "../../Controllers/RestaurantController";
import menu from "./menu";

const router = Router();

// Публичный кабинет ресторана

router.get("/", RestaurantController.getAllRestaurant); // Покажет сортированные рестораны
router.get("/:login", RestaurantController.getRestaurant); // Покажет ресторан по названию

router.use("/:login/menus", menu);

export default router;
