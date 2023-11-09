import AccountService from "../src/ServiceNew/AuthService/LoginService";
import { EnumRole } from "../src/interface/Account/Role";
import { IUserFunctions } from "../src/interface/User/User";
import User from "../src/models/UserModel";

async function index() {
	const user = (await User.findOne({
		login: "z1aaxw1f2c",
	})) as IUserFunctions;

	const userData = {
		user,
		login: "z1aaxw1f2c",
		password: "tipixdxc",
		role: EnumRole.User,
	};

	const data = AccountService.Login(userData);
	console.log(data);
}

index();
