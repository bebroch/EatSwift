import { IUser } from "../../../../interface/User/User";
import DataFormatter from "./DataFormatter";

class DataFormatterUser extends DataFormatter {
	async getUserData(user: IUser) {
		const { address, phoneNumber, cart } = user;
		return {
			...this.getAccountBaseFields(user),
			address,
			phoneNumber,
			cart,
		};
	}
}

export default new DataFormatterUser();
