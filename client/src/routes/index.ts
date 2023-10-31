import { IRouter, RequestHandler, Router } from "express";
import account from "./account";
import auth from "./User/auth";
import home from "./home";
import restaurant from "./restaurant";

const router: IRouter = Router();

router.use("/", home);
router.use("/account", account);
router.use("/restaurant", restaurant);

export default router;
