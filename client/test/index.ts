import { connectDB, disconnectDB } from "../src/database/connect";
import CourierTesting from "./RestaurantTests";
import RestaurantTesting from "./CourierTests";
import UserTesting from "./UserTests";

async function index() {
	await connectDB();

	await UserTesting();
	await RestaurantTesting();
	await CourierTesting();

	await disconnectDB();

	// connectDB();
	// await RegistrationTest();
	// disconnectDB();
}

index();
