import ILoginData from "../../interface/LoginInterface/AccountData";
import Courier from "../../models/Courier";
import Restaurant from "../../models/Restaurant";
import User from "../../models/User";
import executeFunctionBasedOnRole from "../ExecuteFunctionBasedOnRole";

async function checkMissingFields(fields: ILoginData) {
	const { login, password } = fields;

	return !login || !password;
}

async function checkAccountExist(fields: ILoginData) {
	const { login, password, role } = fields;

	return executeFunctionBasedOnRole(role, {
		user: await User.findOne({ login }),
		restaurant: await Restaurant.findOne({ login, password }),
		courier: await Courier.findOne({ login, password }),
	});
}

export { checkMissingFields, checkAccountExist };
