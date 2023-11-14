import { Router } from "express";
import CourierController from "../../Controllers/Courier/CourierController";

const router = Router();

// Личный кабинет курьера

router.get("/", CourierController.getPrivateCourierProfile);

router.get("/order", CourierController.getActiveOrders);
router.get("/order/active", CourierController.getActiveOrder);

router.post("/order", CourierController.takeActiveOrder);
router.post("/order/active", CourierController.updateStatusOrder);

router.get("/history/order", CourierController.getHistoryOfOrders);
router.get("/history/order/:_id", CourierController.getOrderFromHistory);

export default router;
