import { Router } from "express";

const router = Router();

// Публичный кабинет курьера

router.get("/:login");

export default router;
