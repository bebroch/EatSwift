import mongoose from "mongoose";
import { IDish, IDishModel } from "../interface/Restaurant/DIsh/DishModel";
import DishSchema from "./Dish/DishSchema";

const Dish = mongoose.model<IDish, IDishModel>("Dish", DishSchema);

export default Dish;
