import { Router } from "express";
import ProfileController from "../../../Controllers/Restaurant/ProfileController";
import { UpdateProfileMiddleware } from "../../../Middlewares/Validate/Restaurant/UpdateProfileMiddleware";

const router = Router();

router.get("/", ProfileController.getProfile);
router.post("/", UpdateProfileMiddleware, ProfileController.updateProfile);
router.delete("/", ProfileController.deleteProfile);

export default router;
