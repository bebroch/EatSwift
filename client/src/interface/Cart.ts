import { Model as MongooseModel, ObjectId } from "mongoose";
import { IDish } from "./DishModel";
import { IUserFunctions } from "./User";
import { IRestaurantFunctions } from "./Restaurant";
import CartTypes from "../Types/CartTypes";

namespace ICart {
	export interface Get {
		_id: ObjectId;
		user_id: ObjectId;
		restaurant_id: ObjectId;
		item: Item[];
	}

	export interface Functions extends Get {}

	export interface Model extends MongooseModel<Get> {
		createCart(user_id: ObjectId): Promise<Get>;
		addToCart(data: CartTypes.GetDataForAddToCart): Promise<Get>;
		deleteItemFromCart(data: CartTypes.GetDataForDelete): Promise<void>;
	}

	export interface Item {
		_id: ObjectId;
		dish_id: ObjectId;
		quantity: number;
	}

	export interface Details {
		_id: ObjectId;
		user: IUserFunctions;
		restaurant: IRestaurantFunctions;
		item: ItemDetails[];
	}

	export interface ItemDetails {
		_id: ObjectId;
		dish: IDish;
		quantity: number;
	}
}

export default ICart;
