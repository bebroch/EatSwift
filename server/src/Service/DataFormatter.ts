import { UserFormatter } from "./DataFormatter/User/UserFormatter";
import { CartFormatter } from "./DataFormatter/User/CartFormatter";
import { RestaurantFormatter } from "./DataFormatter/Restaurant/RestaurantFormatter";
import { MenuFormatter } from "./DataFormatter/Restaurant/MenuFormatter";
import { DishFormatter } from "./DataFormatter/Restaurant/DishFormatter";
import { CourierFormatter } from "./DataFormatter/Courier/CourierFormatter";
import { OrderFormatter } from "./DataFormatter/User/OrderFormatter";
import { LoginFormatter } from "./DataFormatter/Auth/LoginFormatter";
import { RegistrationFormatter } from "./DataFormatter/Auth/RegistrationFormatter";

class DataFormatter {
	static User = UserFormatter;
	static Cart = CartFormatter;
	static Order = OrderFormatter;

	static Restaurant = RestaurantFormatter;
	static Menu = MenuFormatter;
	static Dish = DishFormatter;

	static Courier = CourierFormatter;

	static Auth = {
		Login: LoginFormatter,
		Registration: RegistrationFormatter,
	};
}

export default DataFormatter;
