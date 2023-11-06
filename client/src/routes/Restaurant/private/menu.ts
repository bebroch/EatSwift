import { Router } from "express";
import MenuController from "../../../Controllers/Restaurant/MenuController";
import CreateMenuValidator from "../../../Middlewares/Validate/Restaurant/Menu/CreateMenuValidation";
import DeleteMenuValidator from "../../../Middlewares/Validate/Restaurant/Menu/DeleteMenuValidation";
import UpdateMenuValidator from "../../../Middlewares/Validate/Restaurant/Menu/UpdateMenuValidator";

const router = Router();

router.get("/", MenuController.getMenusFromPrivateRestaurantProfile);
router.get("/:id", MenuController.getMenuFromPrivateRestaurantProfile);
router.post("/", CreateMenuValidator, MenuController.createMenu);
router.delete("/", DeleteMenuValidator, MenuController.deleteMenu);

router.post("/:menu_id", UpdateMenuValidator, MenuController.updateMenu);
// TODO: Добавить удаление блюда из меню

export default router;
