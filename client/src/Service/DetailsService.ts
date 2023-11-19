import { CartDataDetails } from "./DetailsService/CartDataDetails";
import { DishDataDetails } from "./DetailsService/DishDataDetails";
import { MenuDataDetails } from "./DetailsService/MenuDataDetails";
import { OrderDataDetails } from "./DetailsService/OrderDataDetails";
import { RestaurantDetails } from "./DetailsService/RestaurantDetails";
import { UserDataDetails } from "./DetailsService/UserDataDetails";

class DetailsService {
	static Menu = MenuDataDetails;
	static Dish = DishDataDetails;
	static User = UserDataDetails;
	static Cart = CartDataDetails;
	static Restaurant = RestaurantDetails;
	static Order = OrderDataDetails;
}

export default DetailsService;
