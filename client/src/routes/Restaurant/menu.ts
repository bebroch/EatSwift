import { Router } from "express";
import dish from "./dish";
import MenuController from "../../Controllers/MenuController";

const router = Router();

router.get("/", MenuController.index);
router.get("/:name", MenuController.index);


router.use("/:name", dish);

export default router;
