import { AuthMiddleware } from "../Middlewares/AuthMiddleware";
import UserProfile from "./User/userProfile";
import RestaurantProfile from "./Restaurant/private/restaurantProfile";
import CourierProfile from "./Courier/courierProfile";
import { Router } from "express";

const router = Router();

// Аутентификация пользователя, ресторана и курьера

router.use("/user/profile", AuthMiddleware, UserProfile); 
router.use("/restaurant/profile", AuthMiddleware, RestaurantProfile); 
router.use("/courier/profile", AuthMiddleware, CourierProfile); 

// router.use("/:login", AuthMiddleware as RequestHandler, profile);

export default router;
