import { ObjectId } from "mongoose";

interface IBasket extends Document {
	_id: ObjectId;
	user_id: ObjectId;
	status: string;
	items: ObjectId[];
}

export default IBasket;
