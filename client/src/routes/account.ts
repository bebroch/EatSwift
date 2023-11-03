import { AuthMiddleware } from "../Middlewares/AuthMiddleware";
import UserProfile from "./User/userProfile";
import RestaurantProfile from "./Restaurant/private/restaurantProfile";
import CourierProfile from "./Courier/courierProfile";
import { Router } from "express";

const router = Router();

// Аутентификация пользователя, ресторана и курьера

router.use("/user/profile", AuthMiddleware, UserProfile); // TODO: Доделать аккаунт пользователей
router.use("/restaurant/profile", AuthMiddleware, RestaurantProfile); // TODO: Сделать аккаунт ресторану
router.use("/courier/profile", AuthMiddleware, CourierProfile); // TODO: Сделать аккаунт курьеру

// router.use("/:login", AuthMiddleware as RequestHandler, profile);

export default router;
