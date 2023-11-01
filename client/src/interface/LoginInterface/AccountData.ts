import { EnumRole } from "../Account/Role";

interface ILoginData {
	login: string;
	password: string;
	role: EnumRole;
}

export default ILoginData;
