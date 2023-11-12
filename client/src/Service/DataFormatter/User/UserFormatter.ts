import { UserTypes } from "../../../Types/UserTypes";
import { IUserFunctions } from "../../../interface/User/User";
import DataFormatter from "../../DataFormatter";
import BaseFormatter from "../BaseFormatter";

export const UserFormatter = {
	get(user: UserTypes.GetDataDetails | null) {
		if (!user) {
			return null;
		}

		const { address, phoneNumber } = user;


		return {
			...BaseFormatter.getAccountFields(user),
			address,
			phoneNumber,
			cart: DataFormatter.Cart.getOnlyCart(user.cart),
		};
	},

	getOnlyUser(user: IUserFunctions) {
		const { address, phoneNumber } = user;

		return {
			...BaseFormatter.getAccountFields(user),
			address,
			phoneNumber,
		};
	},
};
