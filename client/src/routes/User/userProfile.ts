import { Router } from "express";
import CartController from "../../Controllers/User/CartController";
import OrderController from "../../Controllers/Order/OrderController";
import UserAccountController from "../../Controllers/User/UserAccountController";

const router = Router();

// Личный кабинет Пользователя
router.get("/", UserAccountController.index);

// TODO Сделать router.use во всех роутерах (Под вопросом)
router.get("/cart", CartController.getCart);
router.post("/cart", CartController.addToCart);
router.delete("/cart", CartController.deleteItemFromCart);

router.get("/order/history", OrderController.User.getHistoryOfOrder);
router.get("/order/active", OrderController.User.getActiveOrders);
router.post("/order/", OrderController.User.makeOrder);
router.post("/order/:_id", OrderController.User.cancelOrder);

export default router;
