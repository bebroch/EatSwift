import { IDish } from "../../interface/Restaurant/DIsh/DishModel";
import { IMenu } from "../../interface/Restaurant/Menu/MenuModel";
import { IRestaurantFunctions } from "../../interface/Restaurant/Restaurant";
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
