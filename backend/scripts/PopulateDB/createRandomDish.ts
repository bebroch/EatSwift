import { faker } from "@faker-js/faker";

function createRandomDish() {
	const numberOfIngredients = faker.number.int({ min: 1, max: 5 }); // Генерируем случайное количество ингредиентов от 1 до 5

	const ingredients = Array.from({ length: numberOfIngredients }, () =>
		faker.commerce.productMaterial()
	);

	return {
		restaurant_id: "",
		menu_id: "",
		name: faker.commerce.productName(),
		description: faker.commerce.productDescription(),
		ingredients: ingredients,
		picture: faker.commerce.productName(),
		price: faker.number.int({ min: 0, max: 5000 }),
	};
}

export default createRandomDish;