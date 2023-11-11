import { Router } from "express";
import AccountController from "../../Controllers/Account/UserAccountController";
import CartController from "../../Controllers/Account/CartController";
import OrderController from "../../Controllers/Account/OrderController";
import UserAccountController from "../../Controllers/Account/UserAccountController";

const router = Router();

// Личный кабинет Пользователя
// TODO: Доделать аккаунт пользователей
router.get("/", UserAccountController.index);

router.get("/cart", CartController.getCart);
router.post("/cart", CartController.addToCart);
router.delete("/cart", CartController.deleteItemFromCart);

router.get("/orders", OrderController.getOrderHistory);
router.post("/orders", OrderController.makeOrder);
router.get("/orders/:_id", OrderController.createOrder);

export default router;
