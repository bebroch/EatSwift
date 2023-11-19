import RegistrationService from "../../src/Service/AuthService/RegistrationService";
import Logger from "../Service/Logger";

export async function RegistrationTest(loginUserData: any) {
	try {
		Logger.startMethod("RegistrationTest");

		const userAuth = await RegistrationService.Registration(loginUserData);
		if (userAuth?.token) {
			Logger.success("Регистрация пользователя выполнена успешно!");
		} else {
			Logger.error("Ошибка регистрации пользователя!");
			return;
		}

		const userData = {
			user: userAuth?.account,
			...loginUserData,
		};

		Logger.endMethod("RegistrationTest");
		Logger.success("RegistrationTest выполнен успешно!");

		return userData;
	} catch (err: any) {
		Logger.endMethod("RegistrationTest");
		Logger.error("Произошла ошибка в процессе регистрации.");
		Logger.createError(err);
	}
}
