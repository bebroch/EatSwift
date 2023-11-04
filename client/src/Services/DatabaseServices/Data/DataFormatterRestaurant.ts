import { IDish } from "../../../interface/Restaurant/Dish";
import { IMenu } from "../../../interface/Restaurant/Menu";
import { IRestaurant } from "../../../interface/Restaurant/Restaurant";

class DataFormatterRestaurant {
	// Рестораны
	async getRestaurantData(restaurant: IRestaurant | Array<IRestaurant>) {
		if (Array.isArray(restaurant)) {
			return await restaurant.map(restaurant => {
				return this.getRestaurant(restaurant);
			});
		}

		const { name, login, email, address, rating, createdAt } =
			await this.getRestaurant(restaurant);

		return {
			name,
			login,
			email,
			address,
			rating,
			createdAt,
			menu: await this.getMenu(restaurant.menu),
		};
	}

	// Основные поля ресторанов
	async getRestaurant(restaurantData: IRestaurant) {
		const { name, login, email, address, rating, createdAt } =
			restaurantData;

		return { name, login, email, address, rating, createdAt };
	}

	// Меню
	async getMenu(menu: IMenu | Array<IMenu>) {
		if (Array.isArray(menu)) {
			return Promise.all(
				menu.map(async (menu: any) => {
					const { name, description, createdAt } = menu;
					return {
						name,
						description,
						createdAt,
						dish: await this.getDish(menu.dish),
					};
				})
			);
		}

		const { name, description, createdAt } = menu;
		return {
			name,
			description,
			createdAt,
			dish: await this.getDish(menu.dish),
		};
	}

	// Блюда
	async getDish(dish: IDish[]) {
		return dish.map((dish: any) => {
			const { name, description, ingredients, picture, price } = dish;
			return { name, description, ingredients, picture, price };
		});
	}
}

export default DataFormatterRestaurant;
