import { Router } from "express";
import OrderController from "../../../Controllers/Order/OrderController";
import { UpdateOrderStatusValidator } from "../../../Middlewares/Validate/UpdateOrderStatusValidator";

const router = Router();

router.get("/active", OrderController.Restaurant.getActiveOrders);
router.get("/history", OrderController.Restaurant.getHistoryOfOrders);
router.post("/:_id", UpdateOrderStatusValidator, OrderController.Restaurant.updateOrder);

export default router;
