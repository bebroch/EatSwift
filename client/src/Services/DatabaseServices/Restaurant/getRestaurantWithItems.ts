import { IRestaurant } from "../../../interface/Restaurant/Restaurant";
import Dish from "../../../models/Dish";
import Menu from "../../../models/Menu";

async function getRestaurantWithItems(restaurant: IRestaurant) {
	return { restaurant };
}

export default getRestaurantWithItems;
