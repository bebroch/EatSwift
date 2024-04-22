import RegistrationService from "../../src/Service/AuthService/RegistrationService";
import Logger from "../Service/Logger";

export async function RegistrationTest(loginUserData: any) {
	try {
		Logger.startMethod("RegistrationTest");

		const userAuth = await RegistrationService.Registration(loginUserData);
		if (userAuth?.token) {
			Logger.success("Регистрация ресторана выполнена успешно!");
		} else {
			Logger.error("Ошибка регистрации ресторана!");
			return;
		}

		const restaurantData = {
			restaurant: userAuth?.account,
			...loginUserData,
		};

		Logger.endMethod("RegistrationTest");
		Logger.success("RegistrationTest выполнен успешно!");

		return restaurantData;
	} catch (err: any) {
		Logger.endMethod("RegistrationTest");
		Logger.error("Произошла ошибка в процессе регистрации.");
		Logger.createError(err);
	}
}
