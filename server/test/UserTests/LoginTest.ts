import LoginService from "../../src/Service/AuthService/LoginService";
import Logger from "../Service/Logger";

export async function LoginTest(userData: any) {
	try {
        Logger.startMethod("LoginTest");

		const userAuth = await LoginService.Login(userData);
		Logger.success("Login пользователя выполнена успешно!");

		Logger.endMethod("LoginTest");

		if (userAuth && userAuth.user?.login === userData.login) {
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
