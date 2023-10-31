import { faker } from "@faker-js/faker";

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

export default createRandomUser;
