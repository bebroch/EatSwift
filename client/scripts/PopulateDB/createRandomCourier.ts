import { faker } from "@faker-js/faker";

function createRandomUser() {
	return {
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		login: faker.person.firstName(),
		email: faker.internet.email(),
		phoneNumber: faker.person.firstName(),
		password: faker.internet.password(),
		verified: true,
	};
}

export default createRandomUser;
