import { ICourier } from "../../../interface/Courier/Courier";
import BaseFormatter from "../BaseFormatter";

export const CourierFormatter = {
	get(courier: ICourier) {
		const { firstName, lastName, phoneNumber } = courier;

		return {
			...BaseFormatter.getAccountFields(courier),
			firstName,
			lastName,
			phoneNumber,
		};
	},
};
