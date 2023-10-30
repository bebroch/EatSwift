import { faker, fakerRU } from "@faker-js/faker";
import { connectDB, disconnectDB } from "../../src/database/connect";
import Restaurant from "../../src/models/Restaurant";
import { ObjectId } from "mongoose";
import Menu from "../../src/models/Menu";
import { IMenu } from "../../src/interface/Menu";
import { IRestaurant } from "../../src/interface/Restaurant";
import { IDish } from "../../src/interface/Dish";
import { IUser } from "../../src/interface/User";
import Dish from "../../src/models/Dish";
import User from "../../src/models/User";

function createRandomRestaurant() {
	return {
		name: fakerRU.company.name(),
		email: faker.internet.email(),
		description: faker.commerce.productDescription(),
		address: faker.location.city(),
		contactInfo: faker.commerce.department(),
		rating: faker.number.int({ min: 0, max: 10 }),
		password: faker.internet.password(),
		verified: <any>faker.number.int({ min: 0, max: 1 }),
	};
}

function createRandomMenu() {
	return {
		restaurant_id: "",
		name: fakerRU.commerce.productName(),
		description: fakerRU.commerce.productName(),
	};
}
fakerRU.database.mongodbObjectId;
function createRandomDish() {
	const numberOfIngredients = faker.number.int({ min: 1, max: 5 }); // Генерируем случайное количество ингредиентов от 1 до 5

	const ingredients = Array.from({ length: numberOfIngredients }, () =>
		fakerRU.commerce.productMaterial()
	);

	return {
		restaurant_id: "",
		menu_id: "",
		name: fakerRU.commerce.productName(),
		description: fakerRU.commerce.productDescription(),
		ingredients: ingredients,
		picture: fakerRU.commerce.productName(),
		price: faker.number.int({ min: 0, max: 5000 }),
	};
}

function createRandomUser() {
	return {
		login: faker.person.firstName(),
		email: faker.internet.email(),
		address: faker.location.city(),
		phoneNumber: faker.person.firstName(),
		password: faker.internet.password(),
		verified: true,
		cart: [],
	};
}

async function getRandomRestaurant() {
	const count = await Restaurant.countDocuments(); // Получите количество ресторанов в базе данных
	const randomIndex = Math.floor(Math.random() * count); // Генерируйте случайный индекс

	const randomRestaurant = await Restaurant.aggregate([
		{ $skip: randomIndex }, // Пропустите случайное количество ресторанов
		{ $limit: 1 }, // Выберите только один ресторан
	]);

	return randomRestaurant[0]; // Верните случайный ресторан
}

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
		const user = await User.createUser(userData);
	}

	await disconnectDB();
}

generate();
