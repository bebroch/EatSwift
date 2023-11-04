import { IDish } from "../../../interface/Restaurant/Dish";
import { IMenu } from "../../../interface/Restaurant/Menu";
import { IRestaurant } from "../../../interface/Restaurant/Restaurant";

class ClearDataRestaurant {
	// Рестораны
	async getRestaurantData(restaurant: IRestaurant | Array<IRestaurant>) {
		if (Array.isArray(restaurant)) {
			return restaurant.map(restaurant => {
				return this.getRestaurant(restaurant);
			});
		}

		const { name, login, email, address, rating, createdAt } =
			this.getRestaurant(restaurant);

		return {
			name,
			login,
			email,
			address,
			rating,
			createdAt,
			menu: this.getMenu(restaurant.menu),
		};
	}

	// Основные поля ресторанов
	private getRestaurant(restaurantData: IRestaurant) {
		const { name, login, email, address, rating, createdAt } =
			restaurantData;

		return { name, login, email, address, rating, createdAt };
	}

	// Меню
	private getMenu(menu: IMenu[]) {
		return menu.map((menu: any) => {
			const { name, description, createdAt } = menu;
			return {
				name,
				description,
				createdAt,
				dish: this.getDish(menu.dish),
			};
		});
	}

	// Блюда
	private getDish(dish: IDish[]) {
		return dish.map((dish: any) => {
			const { name, description, ingredients, picture, price } = dish;
			return { name, description, ingredients, picture, price };
		});
	}
}

export default ClearDataRestaurant;
