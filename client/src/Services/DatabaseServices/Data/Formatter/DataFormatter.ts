import { TAccount } from "../../../../interface/Account/Account";
import { IDish } from "../../../../interface/Restaurant/Dish";
import { IMenu } from "../../../../interface/Restaurant/Menu";
import { IRestaurant } from "../../../../interface/Restaurant/Restaurant";

class DataFormatter {
	getAccountBaseFields(data: TAccount) {
		const { login, email, createdAt } = data;
		return { login, email, createdAt };
	}

	getMenuOrDishBaseFields(data: IMenu | IDish) {
		const { name, description } = data;
		return { name, description };
	}

	getBaseFieldsRestaurant(data: IRestaurant) {
		const { name, address, rating } = data;
		return {
			...this.getAccountBaseFields(data),
			name,
			address,
			rating,
		};
	}

	getBaseFieldsMenu(data: IMenu) {
		return this.getMenuOrDishBaseFields(data);
	}

	getBaseFieldsDish(data: IDish) {
		const { ingredients, picture, price } = data;
		return {
			...this.getMenuOrDishBaseFields(data),
			ingredients,
			picture,
			price,
		};
	}
}

export default DataFormatter;
