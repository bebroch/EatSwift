import { TAccount } from "../../../../interface/Account/Account";
import { IDish } from "../../../../interface/Restaurant/DIsh/DishModel";
import { IMenu } from "../../../../interface/Restaurant/Menu/MenuModel";
import { IRestaurant } from "../../../../interface/Restaurant/Restaurant";
import { ICartItem } from "../../../../interface/User/User";

class DataFormatter {
	getAccountBaseFields(data: TAccount) {
		if (!data) {
			return null;
		}

		const { _id, login, email, createdAt } = data;
		return { _id, login, email, createdAt };
	}

	getMenuOrDishBaseFields(data: IMenu | IDish) {
		if (!data) {
			return null;
		}

		const { name, description } = data;
		return { name, description };
	}

	getBaseFieldsRestaurant(data: IRestaurant) {
		if (!data) {
			return null;
		}

		const { name, rating } = data;
		return {
			...this.getAccountBaseFields(data),
			name,
			rating,
		};
	}

	getBaseFieldsMenu(data: IMenu) {
		return this.getMenuOrDishBaseFields(data);
	}

	getBaseFieldsDish(data: IDish | null) {
		if (!data) {
			return null;
		}

		const { ingredients, picture, price } = data;
		return {
			...this.getMenuOrDishBaseFields(data),
			ingredients,
			picture,
			price,
		};
	}

	getBaseFieldsCart(data: ICartItem) {
		const { _id, quantity } = data;
		return { _id, quantity };
	}
}

export default DataFormatter;
