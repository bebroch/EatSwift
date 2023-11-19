import { Router } from "express";
import OrderController from "../../../Controllers/Order/OrderController";

const router = Router();

router.get("/active", OrderController.Restaurant.getActiveOrders);
router.get("/history", OrderController.Restaurant.getHistoryOfOrders);
router.post("/:_id", OrderController.Restaurant.updateOrder);

export default router;
