import { IRestaurant } from "../../../../interface/Restaurant/Restaurant";
import { DataFormatterMenu } from "./Menu";

class DataFormatterRestaurant extends DataFormatterMenu {
	getRestaurantData(restaurant: IRestaurant | Array<IRestaurant>) {
		if (Array.isArray(restaurant)) {
			return restaurant.map(restaurant => {
				return this.getBaseFieldsRestaurant(restaurant);
			});
		}

		return {
			...this.getBaseFieldsRestaurant(restaurant),
			addresses: restaurant.addresses,
			menu: this.getMenuData(restaurant.menu),
		};
	}
}

export default new DataFormatterRestaurant();
