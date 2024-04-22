import ERROR_MESSAGES from "../../../Message/Errors";
import { UserTypes } from "../../../Types/UserTypes";
import { IUserFunctions } from "../../../interface/User/User";
import DataFormatter from "../../DataFormatter";
import ExceptionErrorService from "../../ExceptionErrorService";
import BaseFormatter from "../BaseFormatter";

export const UserFormatter = {
	get(user: UserTypes.GetDataDetails | null) {
		if (!user) ExceptionErrorService.handler(ERROR_MESSAGES.USER_NOT_FOUND);

		const cart = user.cart
			? DataFormatter.Cart.getOnlyCart(user.cart)
			: undefined;

		return {
			...this.getOnlyUser(user),
			cart,
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
