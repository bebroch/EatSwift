import { ICourier } from "../../../interface/Courier/Courier";
import { IRestaurant } from "../../../interface/Restaurant/Restaurant";
import { IUser } from "../../../interface/User/User";

class ClearDataService {
	private getData(data: any) {
		return {
			firstName: data.firstName,
			lastName: data.lastName,
			name: data.name,
			login: data.login,
			email: data.email,
			address: data.address,
			rating: data.rating,
			phoneNumber: data.phoneNumber,
			cart: data.cart,
			createdAt: data.createdAt,
		};
	}

	async getUserData(user: IUser) {
		return this.getData(user);
	}

	async getRestaurantData(restaurant: IRestaurant | Array<IRestaurant>) {
		if (Array.isArray(restaurant)) {
			return restaurant.map(restaurant => {
				return this.getData(restaurant);
			});
		}

		return this.getData(restaurant);
	}

	async getCourierData(courier: ICourier) {
		return this.getData(courier);
	}
}

export default new ClearDataService();
