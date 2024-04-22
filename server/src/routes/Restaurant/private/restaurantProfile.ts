import { Router } from "express";
import dish from "./dish";
import menu from "./menu";
import profile from "./profile";
import order from "./order";

const router = Router();

// Личный кабинет ресторана

// Профиль
router.use("/", profile);

// Меню
router.use("/menu", menu);

// Блюда
router.use("/dish", dish);

// Заказы
router.use("/order", order);

export default router;
