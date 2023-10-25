import { ObjectId } from "mongoose";

interface IDish extends Document {
	_id: ObjectId;
	menu_id: ObjectId;
	name: string;
	description: string;
	ingredients: string[];
	picture: string;
	price: number;
}

export default IDish;
