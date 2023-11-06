import { Model, ObjectId } from "mongoose";
import { IDish } from "../Restaurant/DIsh/DishModel";

interface ICart {
	cart: IDish[];
}

interface ICartModel extends Model<ICart> {
	createCart(user_id: ObjectId): Promise<ICart>;
}

export { ICart, ICartModel };
