import { faker } from "@faker-js/faker";
function createRandomRestaurant() {
	return {
		name: faker.company.name(),
		email: faker.internet.email(),
		description: faker.commerce.productDescription(),
		address: faker.location.city(),
		contactInfo: faker.commerce.department(),
		rating: faker.number.int({ min: 0, max: 10 }),
		password: faker.internet.password(),
		verified: <any>faker.number.int({ min: 0, max: 1 }),
	};
}

export default createRandomRestaurant;
