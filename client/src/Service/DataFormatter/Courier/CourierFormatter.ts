import { ICourierFunctions } from "../../../interface/Courier/Courier";
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
