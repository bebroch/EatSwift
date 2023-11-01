import { Router } from "express";
import RestaurantController from "../../Controllers/RestaurantController";
import menu from "./menu";

const router = Router();

// Личный кабинет ресторана

router.get("/", ); 
router.get("/", ); 

router.use("/:login/menus", menu);

export default router;
