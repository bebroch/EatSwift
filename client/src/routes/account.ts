import UserProfile from "./User/userProfile";
import RestaurantProfile from "./Restaurant/private/restaurantProfile";
import CourierProfile from "./Courier/courierProfile";
import { Router } from "express";
import { UserAuthMiddleware } from "../Middlewares/Auth/UserAuthMiddleware";
import { CourierAuthMiddleware } from "../Middlewares/Auth/CourierAuthMiddleware";
import { RestaurantAuthMiddleware } from "../Middlewares/Auth/RestaurantAuthMiddleware";

const router = Router();

// Аутентификация пользователя, ресторана и курьера

router.use("/user/profile",  UserAuthMiddleware, UserProfile);
router.use("/restaurant/profile", RestaurantAuthMiddleware, RestaurantProfile);
router.use("/courier/profile", CourierAuthMiddleware, CourierProfile);

// router.use("/:login", AuthMiddleware as RequestHandler, profile);

export default router;
