import { Router } from "express";
import CourierController from "../../Controllers/Courier/CourierController";
import { CourierPublicMiddleware } from "../../Middlewares/CourierPublicMiddleware";

const router = Router();

// Публичный кабинет курьера
router.get(
	"/:login",
	CourierPublicMiddleware,
	CourierController.getPublicCourierProfile
);

export default router;
