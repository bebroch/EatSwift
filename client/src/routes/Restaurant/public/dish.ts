import { Router } from "express";
import DishController from "../../../Controllers/Restaurant/DishController";

const router = Router();

router.use("/dish", DishController.getDishes);
router.use("/dish/:id", DishController.getDish);
export default router;
