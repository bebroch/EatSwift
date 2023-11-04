import { ICourier } from "../../../interface/Courier/Courier";
import { IUser } from "../../../interface/User/User";
import DataFormatterRestaurant from "./DataFormatterRestaurant";

class DataFormatter extends DataFormatterRestaurant {
	// Пользователи
	async getUserData(user: IUser) {
		const { login, email, address, phoneNumber, cart, createdAt } = user;
		return { login, email, address, phoneNumber, cart, createdAt };
	}

	// Курьеры
	async getCourierData(courier: ICourier) {
		const { firstName, lastName, login, email, phoneNumber, createdAt } =
			courier;
		return { firstName, lastName, login, email, phoneNumber, createdAt };
	}
}

export default new DataFormatter();
