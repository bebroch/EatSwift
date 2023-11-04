import { Router } from "express";
import MenuController from "../../../Controllers/Restaurant/MenuController";

const router = Router();

router.get("/", MenuController.getRestaurantProfileMenus);
router.get("/:id", MenuController.getRestaurantProfileMenu);
router.post("/", MenuController.createMenu);
router.delete("/", MenuController.deleteMenu);

export default router;
