import mongoose from "mongoose";
import { IMenu, IMenuModel } from "../interface/MenuModel";
import MenuSchema from "./Menu/MenuSchema";

const Menu = mongoose.model<IMenu, IMenuModel>("Menu", MenuSchema);

export default Menu;
