import { faker } from "@faker-js/faker";
import { EnumRole } from "../../src/interface/Account/Role";
function createRandomRestaurant() {
	const password = faker.internet.password();
	return {
		login: faker.person.firstName(),
		name: faker.company.name(),
		email: faker.internet.email(),
		description: faker.commerce.productDescription(),
		address: faker.location.city(),
		contactInfo: faker.commerce.department(),
		rating: faker.number.int({ min: 0, max: 10 }),
		password: password,
		confirmPassword: password,
		verified: Boolean(faker.number.int({ min: 0, max: 1 })),
		role: EnumRole.Restaurant,
	};
}

export default createRandomRestaurant;
