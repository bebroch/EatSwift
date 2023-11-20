import { Router } from "express";
import DishController from "../../../Controllers/Restaurant/DishController";
import CreateDishValidator from "../../../Middlewares/Validate/Restaurant/Dish/CreateDishValidation";

const router = Router();

router.get("/", DishController.getDishes);
router.get("/:_id", DishController.getDish);
router.post("/", CreateDishValidator, DishController.createDish);
router.delete("/:_id", DishController.deleteDish);

export default router;
