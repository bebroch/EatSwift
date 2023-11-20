import RegistrationService from "../../src/Service/AuthService/RegistrationService";
import JsonService from "../Service/JsonService";
import Logger from "../Service/Logger";
import { DeleteTest } from "./DeleteTest";
import { LoginTest } from "./LoginTest";
import { RegistrationTest } from "./RegistrationTest";

async function RestaurantTesting() {
	const RestaurantData = await JsonService.getRestaurantData();

	Logger.startMethod("RestaurantTesting");

	const restaurantData = await RegistrationTest(RestaurantData.LoginData);
	await LoginTest(restaurantData);

	await DeleteTest();

	Logger.endMethod("RestaurantTesting");
}

export default RestaurantTesting;
