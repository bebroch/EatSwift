import { IRouter, Router } from "express";
import account from "./account";
import home from "./home";
import publicRestaurantProfile from "./Restaurant/public/publicRestaurantProfile.ts";
import publicCourierProfile from "./Courier/publicCourierProfile";
import auth from "./auth";

const router: IRouter = Router();

// Главный Router

router.use("/", home);
router.use("/account", account);

router.use("/auth", auth);

router.use("/restaurants", publicRestaurantProfile); // TODO: Сделать публичную страницу ресторанов, также сделать показ меню и блюд
router.use("/couriers", publicCourierProfile); // TODO: Сделать публичную страницу курьеров

export default router;
