import { Model, ObjectId } from "mongoose";
import { IDish } from "../Restaurant/DIsh/DishModel";
import { IUserFunctions } from "./User";
import { IRestaurantFunctions } from "../Restaurant/Restaurant";
import CartTypes from "../../Types/CartTypes";

type GetCart = ICartItem[];

interface ICart {
	_id: ObjectId;
	user_id: ObjectId;
	restaurant_id: ObjectId;
	item: ICartItem[];
}

interface ICartFunctions extends ICart {}

interface ICartModel extends Model<ICart> {
	createCart(user_id: ObjectId): Promise<ICart>;
	addToCart(data: CartTypes.GetDataForAddToCart): Promise<ICart>;
	deleteItemFromCart(data: CartTypes.GetDataForDelete): Promise<void>;
}

interface ICartItem {
	_id: ObjectId;
	dish_id: ObjectId;
	quantity: number;
}

interface ICartDetails {
	_id: ObjectId;
	user: IUserFunctions;
	restaurant: IRestaurantFunctions;
	item: ICartItemDetails[];
}

interface ICartItemDetails {
	_id: ObjectId;
	dish: IDish;
	quantity: number;
}

export {
	GetCart,
	ICart,
	ICartFunctions,
	ICartModel,
	ICartItem,
	ICartDetails,
	ICartItemDetails,
};
