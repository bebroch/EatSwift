import mongoose, { Model, ObjectId } from "mongoose";

interface ICart extends Document {
	_id?: ObjectId;
	user_id?: ObjectId;
	status?: string;
	items?: ObjectId[];
}

interface ICartModel extends Model<ICart> {
	createCart(user_id: ObjectId): Promise<ICart>;
}

export { ICart, ICartModel };
