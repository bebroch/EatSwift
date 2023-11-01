import { faker } from "@faker-js/faker";

function createRandomMenu() {
	return {
		restaurant_id: "",
		name: faker.commerce.productName(),
		description: faker.commerce.productName(),
	};
}

export default createRandomMenu;
