import { IRouter, RequestHandler, Router } from "express";
import { AuthMiddleware } from "../Middlewares/AuthMiddleware";
import account from "./account";
import auth from "./auth";
import home from "./home";
import restaurant from "./restaurant";

const router: IRouter = Router();

router.use("/", home);
router.use("/account", auth);
router.use("/:login", AuthMiddleware as RequestHandler, account);
router.use("/restaurant", restaurant);

export default router;
