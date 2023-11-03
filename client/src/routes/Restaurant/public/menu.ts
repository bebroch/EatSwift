import { Router } from "express";
import MenuController from "../../../Controllers/Restaurant/MenuController";

const router = Router();

router.use("/menus", MenuController.getMenus);
router.use("/menus/:id", MenuController.getMenu);

export default router;
