import { EnumRole } from "../Account/Role";
import { ICourier } from "../Courier/Courier";
import { IRestaurant } from "../Restaurant/Restaurant";
import { IUser } from "../User/User";

interface ILoginData {
	account: IUser | IRestaurant | ICourier;
	login: string;
	password: string;
	role: EnumRole;
}

export default ILoginData;
