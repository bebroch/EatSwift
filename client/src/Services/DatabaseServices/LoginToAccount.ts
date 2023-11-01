import ILoginData from "../../interface/LoginInterface/AccountData";
import { IAccountData } from "../../interface/RegisterInterface/AccountData";
import { generateToken } from "../Jwt";
import { verifyPassword } from "../Password";

async function loginToAccount(
	loginData: ILoginData
): Promise<IAccountData | undefined> {
	const { account, password, role } = loginData;

	const isPasswordValid = await verifyPassword(password, account.password);

	if (!isPasswordValid) {
		return undefined;
	}

	const accountData = {
		login: account.login,
		role: role,
	};

	const token = await generateToken(accountData);

	return { token, account };
}

export default loginToAccount;
