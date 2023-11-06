import { Router } from "express";
import DishController from "../../../Controllers/Restaurant/DishController";
import CreateDishValidator from "../../../Middlewares/Validate/Restaurant/Dish/CreateDishValidation";
import DeleteDishValidator from "../../../Middlewares/Validate/Restaurant/Dish/DeleteDishValidation";

const router = Router();

router.get("/", DishController.getDishes);
router.get("/:id", DishController.getDish);
router.post("/", CreateDishValidator, DishController.createDish);
router.delete("/:_id", DeleteDishValidator, DishController.deleteDish);

export default router;
