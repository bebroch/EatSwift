import { ObjectId } from "mongoose";
import { ICart, ICartItemDetails } from "../interface/User/Cart";
import { IRestaurantFunctions } from "../interface/Restaurant/Restaurant";
import { IDish } from "../interface/Restaurant/DIsh/DishModel";
import { IUserFunctions } from "../interface/User/User";

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

	export type GetDataDetails = {
		user: IUserFunctions;
		restaurant: IRestaurantFunctions;
		item: GetDataItemDetails[];
	};

	export type GetDataItemDetails = {
		_id: ObjectId;
		dish: IDish;
		quantity: number;
	};

	export type outputDataDetails = GetDataDetails;

	export type outputItemDataDetails = GetDataItemDetails;

	export type outputModel = ICartItemDetails;
}

export default CartTypes;
