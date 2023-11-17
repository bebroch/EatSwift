import { Router } from "express";
import ProfileController from "../../../Controllers/Restaurant/ProfileController";
import { UpdateProfileMiddleware } from "../../../Middlewares/Validate/Restaurant/UpdateProfileMiddleware";
import { DeleteProfileMiddleware } from "../../../Middlewares/Validate/Restaurant/DeleteProfileMiddleware";

const router = Router();

router.get("/", ProfileController.getProfile);
router.post("/", UpdateProfileMiddleware, ProfileController.updateProfile);
router.delete("/", DeleteProfileMiddleware, ProfileController.deleteProfile);

export default router;
