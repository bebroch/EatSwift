import LoginService from "../../src/Service/AuthService/LoginService";
import Logger from "../Service/Logger";

export async function LoginTest(courierData: any) {
	try {
		Logger.startMethod("LoginTest");

		const courierAuth = await LoginService.Login(courierData);
		Logger.success("Login курьера выполнена успешно!");

		Logger.endMethod("LoginTest");

		if (courierAuth && courierAuth.courier?.login === courierData.login) {
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
