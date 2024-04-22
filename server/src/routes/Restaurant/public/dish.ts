import { Router } from "express";
import DishController from "../../../Controllers/Restaurant/DishController";

const router = Router();

router.get("/", DishController.getDishesFromPublicRestaurant);
router.get("/:_id", DishController.getDishFromPublicRestaurant);

export default router;
