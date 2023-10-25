import { Router } from "express";
import dish from "./dish";
import MenuController from "../../Controllers/MenuController";

const router = Router();

router.get("/", MenuController.index);

router.use("/{DishName}", dish);

export default router;
