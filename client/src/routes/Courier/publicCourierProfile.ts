import { Router } from "express";

const router = Router();

// Публичный кабинет курьера
// TODO: Сделать публичную страницу курьеров
router.get("/:login");

export default router;
