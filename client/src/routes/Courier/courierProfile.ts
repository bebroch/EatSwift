import { Router } from "express";
import CourierController from "../../Controllers/Courier/CourierController";
import { UpdateOrderStatusValidator } from "../../Middlewares/Validate/UpdateOrderStatusValidator";

const router = Router();

// Личный кабинет курьера

router.get("/", CourierController.getPrivateCourierProfile);

router.get("/order", CourierController.getActiveOrders);
router.get("/order/active", CourierController.getActiveOrder);

router.post("/order", CourierController.takeActiveOrder);
router.post(
	"/order/active",
	UpdateOrderStatusValidator,
	CourierController.updateStatusOrder
);

router.get("/order/history", CourierController.getHistoryOfOrders);
router.get("/order/history/:_id", CourierController.getOrderFromHistory);

export default router;
