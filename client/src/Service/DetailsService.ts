import { CartDataDetails } from "./DetailsService/CartDataDetails";
import { MenuDataDetails } from "./DetailsService/MenuDataDetails";
import { UserDataDetails } from "./DetailsService/UserDataDetails";

class DetailsService {
	static Menu = MenuDataDetails;
	static User = UserDataDetails;
	static Cart = CartDataDetails
}

export default DetailsService;
