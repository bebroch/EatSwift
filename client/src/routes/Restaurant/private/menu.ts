import { Router } from "express";
import MenuController from "../../../Controllers/Restaurant/MenuController";

const router = Router();

router.get("/", MenuController.getMenusFromPrivateRestaurantProfile);
router.get("/:id", MenuController.getMenuFromPrivateRestaurantProfile);
router.post("/", MenuController.createMenu);
router.delete("/", MenuController.deleteMenu);

export default router;
