import ILoginData from "../../interface/LoginInterface/AccountData";
import { getAccount } from "../DatabaseServices/Accounts/AccountService";

async function checkMissingFields(fields: ILoginData) {
	const { login, password } = fields;

	return !login || !password;
}

async function checkAccountExist(fields: ILoginData) {
	return await getAccount(fields);
}

export { checkMissingFields, checkAccountExist };
