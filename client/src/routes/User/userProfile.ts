import { Router } from "express";
import AccountController from "../../Controllers/Account/AccountController";
import CartController from "../../Controllers/Account/CartController";
import OrderController from "../../Controllers/Account/OrderController";

const router = Router();

// Личный кабинет Пользователя

router.get("/", AccountController.index);

router.get("/cart", CartController.getCart);
router.post("/cart", CartController.addToCart);
router.delete("/cart", CartController.deleteItemFromCart);

router.get("/orders", OrderController.getOrderHistory);
router.get("/orders/:id", OrderController.createOrder);

export default router;
