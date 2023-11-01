import { TAccount } from "../Account/Account";
import { EnumRole } from "../Account/Role";

interface ILoginData {
	account: TAccount;
	login: string;
	password: string;
	role: EnumRole;
}

export default ILoginData;
