import { Router } from "express";
import CartController from "../../Controllers/User/CartController";
import OrderController from "../../Controllers/Order/OrderController";
import UserAccountController from "../../Controllers/User/UserAccountController";

const router = Router();

// Личный кабинет Пользователя
router.get("/", UserAccountController.index);

// TODO Сделать router.use во всех роутерах
router.use("/cart", () => {
	router.get("/", CartController.getCart);
	router.post("/", CartController.addToCart);
	router.delete("/", CartController.deleteItemFromCart);
});

router.use("/order", () => {
	router.get("/history", OrderController.User.getHistoryOfOrder);
	router.get("/active", OrderController.User.getActiveOrders);
	router.post("/", OrderController.User.makeOrder);
	router.post("/:_id", OrderController.User.cancelOrder);
});

export default router;
