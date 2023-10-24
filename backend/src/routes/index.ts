import { IRouter, Router } from "express";
import HomeController from "../Controllers/HomeController";

const router: IRouter = Router();

router.use("/", HomeController.index);

export default router;
