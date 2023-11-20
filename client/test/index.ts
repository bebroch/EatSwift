import { connectDB, disconnectDB } from "../src/database/connect";
import CourierTesting from "./RestaurantTests";
import RestaurantTesting from "./CourierTests";
import UserTesting from "./UserTests";
import OrderStatusTest from "./Order/OrderStatusTest";

async function index() {
	OrderStatusTest();

	// await connectDB();

	// await UserTesting();
	// await RestaurantTesting();
	// await CourierTesting();

	// await disconnectDB();
}

index();
