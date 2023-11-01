import { Model, ObjectId } from "mongoose";
import { IDish } from "../Restaurant/Dish";

interface ICart extends Document {
	items?: IDish[];
}

interface ICartModel extends Model<ICart> {
	createCart(user_id: ObjectId): Promise<ICart>;
}

export { ICart, ICartModel };
