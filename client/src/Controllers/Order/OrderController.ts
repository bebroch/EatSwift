import { UserOrderController } from "./UserOrderController";
import { RestaurantOrderController } from "./RestaurantOrderController";

class OrderController {
	static User = UserOrderController;
	static Restaurant = RestaurantOrderController;
}

export default OrderController;
