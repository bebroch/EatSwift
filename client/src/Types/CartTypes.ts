import { ObjectId } from "mongoose";
import { ICart, ICartItemDetails } from "../interface/User/Cart";
import { IRestaurantFunctions } from "../interface/Restaurant/Restaurant";
import { IDish } from "../interface/Restaurant/DIsh/DishModel";
import { IUserFunctions } from "../interface/User/User";
import { RestaurantTypes } from "./RestaurantTypes";

namespace CartTypes {
	export type GetCart = ICart;

	export type GetAddToCart = {
		dish_id: ObjectId;
		restaurant_id: ObjectId;
		user_id: ObjectId;
	};

	export type GetCartValidate = {
		dish: IDish | null;
		restaurant: IRestaurantFunctions | null;
	};

	export type GetDataForAddToCart = baseData;

	export type GetDataForDelete = baseData;

	type baseData = {
		dish_id: string | ObjectId;
		user_id: string | ObjectId;
		restaurant_id: string | ObjectId;
	};

	export type GetDataForDetails = {
		user_id: ObjectId;
		restaurant_id: ObjectId;
		item: GetDataItemForDetails[];
	};

	export type GetDataItemForDetails = {
		_id: ObjectId;
		dish_id: ObjectId;
		quantity: number;
	};

	export type GetDataDetails = {
		user_id: ObjectId;
		restaurant_id: ObjectId;
		item: GetDataItemDetails[];
	};

	export type GetDataItemDetails = {
		_id: ObjectId;
		dish: IDish | null;
		quantity: number;
	};

	export type outputDataDetails = GetDataDetails;

	export type outputItemDataDetails = GetDataItemDetails;

	export type outputModel = ICartItemDetails;
}

export default CartTypes;
