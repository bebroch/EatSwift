import { ObjectId } from "mongoose";
import { connectDB, disconnectDB } from "../../src/database/connect";
import { IMenu } from "../../src/interface/Restaurant/Menu";
import Courier from "../../src/models/Courier";
import Dish from "../../src/models/Dish";
import Menu from "../../src/models/Menu";
import Restaurant from "../../src/models/Restaurant";
import User from "../../src/models/User";
import createRandomCourier from "./createRandomCourier";
import createRandomDish from "./createRandomDish";
import createRandomMenu from "./createRandomMenu";
import createRandomRestaurant from "./createRandomRestaurant";
import createRandomUser from "./createRandomUser";

async function generate() {
	await connectDB();
	for (let i = 0; i < 10; i++) {
		const restaurantData = createRandomRestaurant();
		const restaurant = await Restaurant.createRestaurant(restaurantData);

		for (let i = 0; i < 3; i++) {
			var menuData = createRandomMenu();
			const menu = (await Menu.createMenu({
				restaurant_id: restaurant._id as ObjectId,
				name: menuData.name,
				description: menuData.description,
			})) as IMenu;

			for (let i = 0; i < 5; i++) {
				let dishData = createRandomDish();
				await Dish.createDish({
					restaurant_id: restaurant._id as ObjectId,
					menu_id: menu._id,
					name: dishData.name,
					description: dishData.description,
					ingredients: dishData.ingredients,
					picture: dishData.picture,
					price: dishData.price,
				});
			}
		}
	}

	for (let i = 0; i < 10; i++) {
		const userData = createRandomUser();
		await User.createUser(userData);
	}

	for (let i = 0; i < 10; i++) {
		const courierData = createRandomCourier();
		await Courier.createCourier(courierData);
	}

	await disconnectDB();
}

generate();
