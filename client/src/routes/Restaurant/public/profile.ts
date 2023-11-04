import { Router } from "express";
import RestaurantController from "../../../Controllers/Restaurant/RestaurantController";
import menu from "./menu";
import dish from "./dish";

const router = Router();

// Публичный кабинет ресторана

router.get("/", RestaurantController.getRestaurant);

router.use("/menu", menu);

router.use("/dish", dish);

export default router;
