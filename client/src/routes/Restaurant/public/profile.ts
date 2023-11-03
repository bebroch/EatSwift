import { Router } from "express";
import RestaurantController from "../../../Controllers/Restaurant/RestaurantController";
import menu from "./menu";
import dish from "./dish";

const router = Router();

// Публичный кабинет ресторана

router.get("/", RestaurantController.getRestaurant); // Покажет ресторан по названию

router.use("/menus", menu);

router.use("/dish", dish);

export default router;
