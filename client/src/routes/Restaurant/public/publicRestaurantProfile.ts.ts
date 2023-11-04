import { Response, Request, Router } from "express";
import RestaurantController from "../../../Controllers/Restaurant/RestaurantController";
import profile from "./profile";

const router = Router();

router.param(
	"login",
	(req: Request & { login?: string }, res: Response, next) => {
		req.login = req.params.login;
		next();
	}
);

// Рестораны
router.get("/", RestaurantController.getAllRestaurant);

// Публичный кабинет ресторана
router.use("/:login", profile);

export default router;
