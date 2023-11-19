import { Router } from "express";
import MenuController from "../../../Controllers/Restaurant/MenuController";
import CreateMenuValidator from "../../../Middlewares/Validate/Restaurant/Menu/CreateMenuValidation";
import DeleteMenuValidator from "../../../Middlewares/Validate/Restaurant/Menu/DeleteMenuValidation";
import UpdateMenuValidator from "../../../Middlewares/Validate/Restaurant/Menu/UpdateMenuValidator";

const router = Router();

router.get("/", MenuController.getMenusFromPrivateRestaurantProfile);
router.get("/:_id", MenuController.getMenuFromPrivateRestaurantProfile);
router.post("/", CreateMenuValidator, MenuController.createMenu);
router.delete("/:_id", DeleteMenuValidator, MenuController.deleteMenu);

router.post("/:menu_id", UpdateMenuValidator, MenuController.updateMenu);
router.post("/:menu_id/:dish_id", MenuController.deleteFromMenu);

export default router;
