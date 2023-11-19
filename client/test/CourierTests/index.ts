import JsonService from "../Service/JsonService";
import Logger from "../Service/Logger";
import { DeleteTest } from "./DeleteTest";
import { LoginTest } from "./LoginTest";
import { RegistrationTest } from "./RegistrationTest";

async function UserTesting() {
	const CourierData = await JsonService.getCourierData();

	Logger.startMethod("CourierTesting");

	const courierData = await RegistrationTest(CourierData.LoginData);
	await LoginTest(courierData);
	await DeleteTest();

	Logger.endMethod("CourierTesting");
}

export default UserTesting;
