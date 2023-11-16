import { ICourierFunctions } from "../../../interface/Courier";
import BaseFormatter from "../BaseFormatter";

export const CourierFormatter = {
	get(courier: ICourierFunctions) {
		const { firstName, lastName, phoneNumber } = courier;

		return {
			...BaseFormatter.getAccountFields(courier),
			firstName,
			lastName,
			phoneNumber,
		};
	},
};
