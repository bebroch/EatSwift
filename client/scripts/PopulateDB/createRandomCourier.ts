import { faker } from "@faker-js/faker";
import { EnumRole } from "../../src/interface/Account/Role";

function createRandomUser() {
	const password = faker.internet.password();
	return {
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		login: faker.person.firstName(),
		email: faker.internet.email(),
		phoneNumber: faker.person.firstName(),
		password: password,
		confirmPassword: password,
		verified: true,
		role: EnumRole.Courier,
	};
}

export default createRandomUser;
