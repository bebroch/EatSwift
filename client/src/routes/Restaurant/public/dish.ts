import { Router } from "express";
import DishController from "../../../Controllers/Restaurant/DishController";

const router = Router();

router.use("/", DishController.getDishes);
router.use("/:id", DishController.getDish);
export default router;
