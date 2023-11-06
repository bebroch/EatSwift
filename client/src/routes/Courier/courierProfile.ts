import { Router } from "express";

const router = Router();

// Личный кабинет курьера
// TODO: Сделать аккаунт курьеру

router.get("/");

router.get("/order");
router.post("/order");
router.delete("/order");

router.use("/history", () => {
	router.get("/orders");
	router.get("/orders/:id");
});

export default router;
