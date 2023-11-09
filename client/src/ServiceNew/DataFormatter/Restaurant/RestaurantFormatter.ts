import { IRestaurant } from "../../../interface/Restaurant/Restaurant";
import DataFormatter from "../../DataFormatter";
import BaseFormatter from "../BaseFormatter";

export const RestaurantFormatter = {
	// TODO Добавить type IRestaurant | Array<IRestaurant>
	get(restaurant: IRestaurant | Array<IRestaurant>) {
		if (Array.isArray(restaurant)) {
			return restaurant.map(restaurant => {
				return BaseFormatter.getRestaurantFields(restaurant);
			});
		}

		return {
			...BaseFormatter.getRestaurantFields(restaurant),
			addresses: restaurant.addresses,
			menu: DataFormatter.Menu.get(restaurant.menu),
		};
	},
};
