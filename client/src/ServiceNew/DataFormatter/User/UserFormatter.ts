import { IUserFunctions } from "../../../interface/User/User";
import DataFormatter from "../../DataFormatter";
import BaseFormatter from "../BaseFormatter";

export const UserFormatter = {
	get(user: IUserFunctions) {
		const { address, phoneNumber, cart } = user;

		return {
			...BaseFormatter.getAccountFields(user),
			address,
			phoneNumber,
			cart: DataFormatter.Cart.get(cart),
		};
	},
};
