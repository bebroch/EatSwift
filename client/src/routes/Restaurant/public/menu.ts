import { Router } from "express";
import MenuController from "../../../Controllers/Restaurant/MenuController";

const router = Router();
router.get("/", MenuController.getMenusFromPublicRestaurantProfile);
router.get("/:_id", MenuController.getMenuFromPublicRestaurantProfile);

export default router;
