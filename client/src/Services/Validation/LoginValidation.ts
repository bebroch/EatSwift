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
	const { login, role } = fields;

	return executeFunctionBasedOnRole(role, {
		user: async () => {
			return await User.findOne({ login });
		},
		restaurant: async () => {
			return await Restaurant.findOne({ login });
		},
		courier: async () => {
			return await Courier.findOne({ login });
		},
	});
}

export { checkMissingFields, checkAccountExist };
