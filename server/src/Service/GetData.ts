import { CourierData } from "./GetData/CourierData";
import { DishData } from "./GetData/DishData";
import { MenuData } from "./GetData/MenuData";
import { TokenData } from "./GetData/TokenData";
import { RestaurantData } from "./GetData/RestaurantData";
import { UserData } from "./GetData/UserData";
import { RegistrationData } from "./GetData/Auth/RegistrationData";
import { LoginData } from "./GetData/Auth/LoginData";
import { OrderData } from "./GetData/OrderData";

class GetData {
	static Restaurant = RestaurantData;
	static Menu = MenuData;
	static Dish = DishData;
	static User = UserData;
	static Order = OrderData;
	static Courier = CourierData;

	static Token = TokenData;
	static Auth = {
		Login: LoginData,
		Registration: RegistrationData,
	};
}

export default GetData;
