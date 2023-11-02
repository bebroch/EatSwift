import { faker } from "@faker-js/faker";
import { EnumRole } from "../../src/interface/Account/Role";

function createRandomUser() {
	const password = faker.internet.password();
	return {
		login: faker.person.firstName(),
		email: faker.internet.email(),
		address: faker.location.city(),
		phoneNumber: faker.person.firstName(),
		password: password,
		confirmPassword: password,
		verified: true,
		cart: [],
		role: EnumRole.User,
	};
}

export default createRandomUser;
