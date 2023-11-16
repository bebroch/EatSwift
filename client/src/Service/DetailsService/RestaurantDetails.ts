import { IDish } from "../../interface/DishModel";
import { IMenu } from "../../interface/MenuModel";
import { IRestaurantFunctions } from "../../interface/Restaurant";
import Dish from "../../models/DishModel";

export const RestaurantDetails = {
	async get(restaurant: IRestaurantFunctions) {
		const menus = await restaurant.getMenus();
		const dishes = await restaurant.getDishes();

		return {
			...restaurant,
			menu: menus,
			dish: dishes,
		};
	},
};
