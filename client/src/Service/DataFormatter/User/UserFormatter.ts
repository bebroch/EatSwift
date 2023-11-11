import { UserTypes } from "../../../Types/UserTypes";
import { IUserFunctions } from "../../../interface/User/User";
import DataFormatter from "../../DataFormatter";
import BaseFormatter from "../BaseFormatter";

export const UserFormatter = {
	get(user: UserTypes.GetDataDetails) {
		const { address, phoneNumber } = user.data;

		return {
			...BaseFormatter.getAccountFields(user.data),
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
