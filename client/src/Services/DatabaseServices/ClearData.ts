import { ICourier } from "../../interface/Courier/Courier";
import { IRestaurant } from "../../interface/Restaurant/Restaurant";
import { IUser } from "../../interface/User/User";

class ClearDataService {
	async getUserData(user: IUser) {
		return {
			login: user.login,
			email: user.email,
			address: user.address,
			phoneNumber: user.phoneNumber,
			cart: user.cart,
			createdAt: user.createdAt,
		};
	}

	async getRestaurantData(restaurant: IRestaurant) {
		return {
			name: restaurant.name,
			email: restaurant.email,
			address: restaurant.address,
			rating: restaurant.rating,
			createdAt: restaurant.createdAt,
		};
	}

	async getCourierData(courier: ICourier) {
		return {
			firstName: courier.firstName,
			lastName: courier.lastName,
			createdAt: courier.createdAt,
		};
	}
}

export default new ClearDataService();
