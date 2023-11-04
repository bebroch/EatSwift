import { Router } from "express";
import MenuController from "../../../Controllers/Restaurant/MenuController";

const router = Router();

router.get("/", MenuController.getMenus);
router.get("/:id", MenuController.getMenu);

export default router;
