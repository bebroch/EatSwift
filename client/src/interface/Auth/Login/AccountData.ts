import { EnumRole } from "../../../Enums/Role";
import AccountDataTypes from "../../../../Types/AccountDataTypes";

namespace ILogin{
	interface Data {
		account: AccountDataTypes.GetModels;
		login: string;
		password: string;
		role: EnumRole;
	}

}

export default ILogin;
