import { ObjectId } from "mongoose";
import CartTypes from "../../Types/CartTypes";
import { DishTypes } from "../../Types/DishTypes";
import OrderTypes from "../../Types/OrderTypes";
import { TAccount } from "../../interface/Account/Account";
import { IMenu } from "../../interface/Restaurant/Menu/MenuModel";
import { IRestaurantFunctions } from "../../interface/Restaurant/Restaurant";
import mongoose from "mongoose";

class BaseFormatter {
	getAccountFields(data: TAccount | null) {
		if (!data) return null;

		const { _id, login, email, createdAt } = data;
		return { _id, login, email, createdAt };
	}

	getRestaurantFields(data: IRestaurantFunctions | null) {
		if (!data) return null;

		const { name, rating } = data;

		return {
			...this.getAccountFields(data),
			name,
			rating,
		};
	}

	getMenuFields(data: IMenu | null) {
		if (!data) return null;

		const { _id, name, description } = data;
		return { _id, name, description };
	}

	getDishFields(data: DishTypes.GetDataDetails | null) {
		if (!data) return null;

		const { _id, name, description, ingredients, price } = data;
		return { _id, name, description, ingredients, price };
	}

	getCartItemFields(data: CartTypes.GetDataItemDetails | null) {
		if (!data) return null;

		const { _id, dish, quantity } = data;
		return { _id, dish, quantity };
	}

	getOrderFields(data: OrderTypes.GetDataDetails | null) {
		if (!data) return null;

		const { _id, user_id, courier_id, restaurant_id, item, status } = data;
		return { _id, user_id, courier_id, restaurant_id, item, status };
	}

	getOrderItemFields(data: CartTypes.GetDataItemDetails | null) {
		if (!data) return null;

		const { _id, quantity } = data;
		return { _id, quantity };
	}
}

export default new BaseFormatter();
