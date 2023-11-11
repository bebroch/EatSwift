import LoginService from "../../src/Service/AuthService/LoginService";
import Log from "../Log";

async function LoginTest(data: any) {
	const {
		user: userData,
		restaurant: restaurantData,
		courier: courierData,
	} = data;

	try {
		Log.startMethod("LoginTest");

		const userAuth = await LoginService.Login(userData);
		Log.success("Login пользователя выполнена успешно!");
		const restaurantAuth = await LoginService.Login(restaurantData);
		Log.success("Login ресторана выполнена успешно!");
		const courierAuth = await LoginService.Login(courierData);
		Log.success("Login курьера выполнена успешно!");

		Log.endMethod("LoginTest");

		if (userAuth && restaurantAuth && courierAuth) {
			Log.success("LoginTest выполнен успешно!");
		} else {
			Log.error("LoginTest Не выполнен.");
		}
	} catch (err: any) {
		Log.error("LoginTest Не выполнен.");
		Log.error(err.message);
	}
}

export { LoginTest };
