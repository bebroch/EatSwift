import RegistrationService from "../../src/Service/AuthService/RegistrationService";
import { EnumRole } from "../../src/interface/Account/Role";
import Courier from "../../src/models/CourierModel";
import Restaurant from "../../src/models/RestaurantModel";
import User from "../../src/models/UserModel";
import Log from "../Log";
import { LoginTest } from "./LoginTest";

async function RegistrationTest() {
	const baseData = {
		login: "TestAccount",
		email: "TestEmail@example.com",
		password: "TestPassword",
		confirmPassword: "TestPassword",
	};

	const loginUserData = {
		...baseData,
		role: EnumRole.User,
	};

	const loginRestaurantData = {
		...baseData,
		name: "TestRestaurant",
		role: EnumRole.Restaurant,
	};

	const loginCourierData = {
		...baseData,
		firstName: "TestFirstName",
		lastName: "TestLastName",
		role: EnumRole.Courier,
	};

	try {
		Log.startMethod("RegistrationTest");

		const userAuth = await RegistrationService.Registration(loginUserData);
		if (userAuth?.token) {
			Log.success("Регистрация пользователя выполнена успешно!");
		} else {
			Log.error("Ошибка регистрации пользователя!");
			return;
		}

		const restaurantAuth =
			await RegistrationService.Registration(loginRestaurantData);
		if (restaurantAuth?.token) {
			Log.success("Регистрация ресторана выполнена успешно!");
		} else {
			Log.error("Ошибка регистрации ресторана!");
			return;
		}

		const courierAuth =
			await RegistrationService.Registration(loginCourierData);
		if (courierAuth?.token) {
			Log.success("Регистрация курьера выполнена успешно!");
		} else {
			Log.error("Ошибка регистрации курьера!");
			return;
		}

		const userData = {
			user: userAuth?.account,
			...loginUserData,
		};
		const restaurantData = {
			restaurant: restaurantAuth?.account,
			...loginRestaurantData,
		};
		const courierData = {
			courier: courierAuth?.account,
			...loginCourierData,
		};

		Log.endMethod("RegistrationTest");
		Log.success("RegistrationTest выполнен успешно!");
		await LoginTest({
			user: userData,
			restaurant: restaurantData,
			courier: courierData,
		});
	} catch (err: any) {
		Log.error("Произошла ошибка в процессе регистрации.");
		Log.error(err);
	}

	try {
		Log.startMethod("DeleteAccountTest");

		Log.message("Удаление...");
		await User.deleteOne({ login: "TestAccount" });
		Log.success("Пользователь удален!");
		await Restaurant.deleteOne({ login: "TestAccount" });
		Log.success("Ресторан удален!");
		await Courier.deleteOne({ login: "TestAccount" });
		Log.success("Курьер удален!");
	
		Log.endMethod("DeleteAccountTest");

		Log.success("Все аккаунты успешно удалены!");
	} catch (err: any) {
		Log.error("Произошла ошибка при удалении.");
		Log.error(err);
	}
}

export { RegistrationTest };
