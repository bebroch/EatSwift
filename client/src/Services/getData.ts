import { ICourier } from "../interface/Courier";
import { IRestaurant } from "../interface/Restaurant";
import { EnumRole } from "../interface/Role";
import { IUser } from "../interface/User";

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
