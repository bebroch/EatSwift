import { IRouter, Router } from "express";
import restaurant from "./Restaurant/restaurant";
import account from "./account";
import auth from "./auth";
import home from "./home";

const router: IRouter = Router();

router.use("/", home);
router.use("/account", auth);
router.use("/{login}", account);
router.use("/restaurant", restaurant);

export default router;
