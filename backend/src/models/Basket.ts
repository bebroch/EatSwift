import mongoose, { Document, Model, ObjectId } from "mongoose";

interface IBasket extends Document {
	user_id: ObjectId;
	status: string;
	items: ObjectId[];
}

const BasketSchema = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Dish",
	},
	status: { type: String, required: true },
	items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dish" }],
});

const Basket: Model<IBasket> = mongoose.model<IBasket>("Basket", BasketSchema);

export default Basket;
