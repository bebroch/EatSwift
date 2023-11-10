import { Model, ObjectId } from "mongoose";
import { IDish } from "../Restaurant/DIsh/DishModel";

type GetCart = ICartItem[];

interface ICart {
	cart: ICartItem[];
}

interface ICartFunctions extends ICart {}

interface ICartModel extends Model<ICart> {
	createCart(user_id: ObjectId): Promise<ICart>;
}

interface ICartItem {
	_id: ObjectId;
	dish: IDish;
	quantity: number;
}

export { GetCart, ICart, ICartFunctions, ICartModel, ICartItem };
