import { IRestaurant } from "../../../interface/Restaurant/Restaurant";
import Dish from "../../../models/Dish";
import Menu from "../../../models/Menu";

async function getRestaurantWithItems(restaurant: IRestaurant) {
	const menus = Menu.find({ restaurant_id: restaurant._id });
	const dishes = Dish.find({ restaurant_id: restaurant._id });

	//restaurant.menu = menus;
	//restaurant.dish = dishes;

	return { restaurant };
}

export default getRestaurantWithItems;
