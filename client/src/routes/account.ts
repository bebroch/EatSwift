import { AuthMiddleware } from "../Middlewares/AuthMiddleware";
import UserProfile from "./User/userProfile";
import RestaurantProfile from "./Restaurant/restaurantProfile";
import CourierProfile from "./Courier/courierProfile";
import { Router } from "express";

const router = Router();

// Аутентификация пользователя, ресторана и курьера

router.use("/user/:login", AuthMiddleware, UserProfile);
router.use("/restaurant/:login", AuthMiddleware, RestaurantProfile);
router.use("/courier/:login", AuthMiddleware, CourierProfile);

// router.use("/:login", AuthMiddleware as RequestHandler, profile);

export default router;
