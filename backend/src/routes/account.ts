import { Router } from "express";
import AccountController from "../Controllers/AccountController";

const router = Router();

router.get("/", AccountController.index);

router.get("/orders", AccountController.orders);
router.get("/orders/:id", AccountController.order);
router.post("/orders", AccountController.createOrder);

router.get("/cart", AccountController.getCart);
router.post("/cart", AccountController.addToCart);
router.delete("/cart", AccountController.deleteItemFromCart);

export default router;
