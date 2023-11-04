import { Router } from "express";
import DishController from "../../../Controllers/Restaurant/DishController";

const router = Router();

router.get("/", DishController.getDishes);
router.get("/:id", DishController.getDish);
router.post("/", DishController.createDish);
router.delete("/", DishController.deleteDish);

export default router;