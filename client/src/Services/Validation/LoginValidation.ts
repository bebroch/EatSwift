import ILoginData from "../../interface/LoginInterface/AccountData";
import Courier from "../../models/Courier";
import Restaurant from "../../models/Restaurant";
import User from "../../models/User";
import { getAccount } from "../DatabaseServices/AccountService";
import executeFunctionBasedOnRole from "../ExecuteFunctionBasedOnRole";

async function checkMissingFields(fields: ILoginData) {
	const { login, password } = fields;

	return !login || !password;
}

async function checkAccountExist(fields: ILoginData) {
	return getAccount(fields);
}

export { checkMissingFields, checkAccountExist };
