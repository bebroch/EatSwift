import RegistrationService from "../../src/Service/AuthService/RegistrationService";
import Logger from "../Service/Logger";

export async function RegistrationTest(loginCourierData: any) {
	try {
		Logger.startMethod("RegistrationTest");

		const courierAuth =
			await RegistrationService.Registration(loginCourierData);
		if (courierAuth?.token) {
			Logger.success("Регистрация курьера выполнена успешно!");
		} else {
			Logger.error("Ошибка регистрации курьера!");
			return;
		}

		const courierData = {
			courier: courierAuth?.account,
			...loginCourierData,
		};

		Logger.endMethod("RegistrationTest");
		Logger.success("RegistrationTest выполнен успешно!");

		return courierData;
	} catch (err: any) {
		Logger.endMethod("RegistrationTest");
		Logger.error("Произошла ошибка в процессе регистрации.");
		Logger.createError(err);
	}
}
