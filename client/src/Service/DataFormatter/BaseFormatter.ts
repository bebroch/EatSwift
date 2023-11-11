import CartTypes from "../../Types/CartTypes";
import { TAccount } from "../../interface/Account/Account";
import { IDish } from "../../interface/Restaurant/DIsh/DishModel";
import { IMenu } from "../../interface/Restaurant/Menu/MenuModel";
import {
	IRestaurant,
	IRestaurantFunctions,
} from "../../interface/Restaurant/Restaurant";
import { ICart } from "../../interface/User/Cart";
import { ICartItem } from "../../interface/User/User";

// TODO Если смогу, нужно заменить if (!data) return null;
class BaseFormatter {
	getAccountFields(data: TAccount | null) {
		if (!data) {
			return null;
		}

		const { _id, login, email, createdAt } = data;
		return { _id, login, email, createdAt };
	}

	getRestaurantFields(data: IRestaurantFunctions | null) {
		if (!data) {
			return null;
		}

		const { name, rating } = data;

		return {
			...this.getAccountFields(data),
			name,
			rating,
		};
	}

	getMenuFields(data: IMenu | null) {
		if (!data) {
			return null;
		}

		const { _id, name, description } = data;
		return { _id, name, description };
	}

	getDishFields(data: IDish | null) {
		if (!data) {
			return null;
		}

		const { _id, name, description, ingredients, picture, price } = data;

		return { _id, name, description, ingredients, picture, price };
	}

	getCartItemFields(data: CartTypes.GetDataItemDetails | null) {
		if (!data) {
			return null;
		}

		const { _id, dish, quantity } = data;
		return { _id, dish, quantity };
	}
}

export default new BaseFormatter();
