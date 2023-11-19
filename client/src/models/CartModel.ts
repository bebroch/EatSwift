import mongoose from "mongoose";
import CartSchema from "./Cart/CartSchema";
import { ICart, ICartModel } from "../interface/User/Cart";

const Cart = mongoose.model<ICart, ICartModel>("Cart", CartSchema);

export default Cart;
