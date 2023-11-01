import { ICourier } from "../interface/Courier/Courier";
import { IRestaurant } from "../interface/Restaurant/Restaurant";
import { EnumRole } from "../interface/Account/Role";
import { IUser } from "../interface/User/User";

class GetData {
	async handleUser(data: IUser): Promise<any | undefined> {
		const { login } = data;
		return { login };
	}

	async handleRestaurant(data: IRestaurant): Promise<any | undefined> {
		const { name } = data;
		return { name };
	}

	async handleCourier(data: ICourier): Promise<any | undefined> {
		const { login } = data;
		return { login };
	}
}

export default new GetData();
