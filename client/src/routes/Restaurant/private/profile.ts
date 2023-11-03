import { Router } from "express";
import ProfileController from "../../../Controllers/Restaurant/ProfileController";

const router = Router();

router.get("/", ProfileController.getProfile);
router.post("/", ProfileController.updateProfile);
router.delete("/", ProfileController.deleteProfile);

export default router;
