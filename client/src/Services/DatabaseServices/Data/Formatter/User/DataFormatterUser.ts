import { IUser, IUserFunctions } from "../../../../../interface/User/User";
import { DataFormatterCart } from "./DataFormatterCart";

class DataFormatterUser extends DataFormatterCart {
	getUserData(user: IUserFunctions) {
		const { address, phoneNumber, cart } = user;
		console.log(this.getCartData(cart));
		return {
			...this.getAccountBaseFields(user),
			address,
			phoneNumber,
			cart: this.getCartData(cart),
		};
	}
}

export default new DataFormatterUser();
