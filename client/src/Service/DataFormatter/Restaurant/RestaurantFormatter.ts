import { RestaurantTypes } from "../../../Types/RestaurantTypes";
import { IRestaurantFunctions } from "../../../interface/Restaurant/Restaurant";
import DataFormatter from "../../DataFormatter";
import BaseFormatter from "../BaseFormatter";

export const RestaurantFormatter = {
	// TODO Добавить type IRestaurantFunctions | Array<IRestaurantFunctions>
	get(
		restaurant: RestaurantTypes.GetDataDetails | Array<IRestaurantFunctions>
	) {
		if (Array.isArray(restaurant)) {
			return restaurant.map(restaurant => {
				return BaseFormatter.getRestaurantFields(restaurant);
			});
		}

		return {
			...this.getOnlyRestaurant(restaurant),
			menu: DataFormatter.Menu.get(restaurant.menu),
			dish: DataFormatter.Dish.get(restaurant.dish),
		};
	},

	getOnlyRestaurant(restaurant: IRestaurantFunctions) {
		return {
			...BaseFormatter.getRestaurantFields(restaurant),
			addresses: restaurant.addresses,
		};
	},
};
