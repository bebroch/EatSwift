import LoginService from "../../src/Service/AuthService/LoginService";
import Logger from "../Service/Logger";

export async function LoginTest(restaurantData: any) {
	try {
		Logger.startMethod("LoginTest");

		const restaurantAuth = await LoginService.Login(restaurantData);
		Logger.success("Login ресторана выполнена успешно!");

		Logger.endMethod("LoginTest");

		if (
			restaurantAuth &&
			restaurantAuth.restaurant?.login === restaurantData.login
		) {
			Logger.success("LoginTest выполнен успешно!");
		} else {
			Logger.error("LoginTest Не выполнен.");
		}
	} catch (err: any) {
		Logger.endMethod("LoginTest");
		Logger.error("LoginTest Не выполнен.");
		Logger.createError(err.message);
	}
}
