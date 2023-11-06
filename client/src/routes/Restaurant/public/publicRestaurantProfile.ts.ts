import { Router } from "express";
import RestaurantController from "../../../Controllers/Restaurant/RestaurantController";
import profile from "./profile";
import restaurantParamHandler from "../../../handlers/restaurantParamHandler";

const router = Router();

router.param("login", restaurantParamHandler);

// Рестораны
router.get("/", RestaurantController.getAllRestaurant);

// Публичный кабинет ресторана
router.use("/:login", profile);

export default router;
