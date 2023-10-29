import { ObjectId } from "mongoose";

interface ICart extends Document {
	_id: ObjectId;
	user_id: ObjectId;
	status: string;
	items: ObjectId[];
}

export default ICart;
