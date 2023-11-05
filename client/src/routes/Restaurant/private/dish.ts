import { Router } from "express";
import DishController from "../../../Controllers/Restaurant/DishController";
import CreateDishValidator from "../../../Middlewares/Validate/Restaurant/Dish/CreateDishValidation";
import DeleteDishValidator from "../../../Middlewares/Validate/Restaurant/Dish/DeleteDishValidation";

const router = Router();
// TODO: Сделать - Контроллер для блюд

router.get("/", DishController.getDishes);
router.get("/:id", DishController.getDish);
router.post("/", CreateDishValidator, DishController.createDish);
router.delete("/", DeleteDishValidator, DishController.deleteDish);

export default router;
