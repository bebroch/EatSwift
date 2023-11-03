import { Router } from "express";
import RestaurantController from "../../../Controllers/Restaurant/RestaurantController";
import profile from "./profile";

const router = Router();

// Рестораны
router.get("/", RestaurantController.getAllRestaurant);

// Публичный кабинет ресторана
router.use("/:login", profile);

export default router;
