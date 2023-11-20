import mongoose from "mongoose";
import { IRating, IRatingModel } from "../interface/Rating/Rating";
import RatingSchema from "./Rating/RatingSchema";

const Rating = mongoose.model<IRating, IRatingModel>("Rating", RatingSchema);

export default Rating;
