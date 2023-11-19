import { Request } from "express";
import { EnumRole } from "../../../interface/Account/Role";
import { UserTypes } from "../../../Types/UserTypes";
import { RestaurantTypes } from "../../../Types/RestaurantTypes";
import { CourierTypes } from "../../../Types/CourierTypes";
import ModelTypes from "../../../Types/ModelTypes";

function getRegistrationData(req: Request) {
	const { login, email, password, confirmPassword, role } = req.body;
	return { login, email, password, confirmPassword, role };
}

function UserRegistrationData(req: Request & UserTypes.GetModel) {
	return { ...getRegistrationData(req) };
}

function RestaurantRegistrationData(req: Request & RestaurantTypes.GetPrivate) {
	const { name } = req.body;
	return { name, ...getRegistrationData(req) };
}

function CourierRegistrationData(req: Request & CourierTypes.GetPrivate) {
	const { firstName, lastName } = req.body;
	return { firstName, lastName, ...getRegistrationData(req) };
}

export const RegistrationData = {
	get(req: Request) {
		const role = req.body.role;

		switch (role) {
			case EnumRole.User:
				return UserRegistrationData(
					req as Request & UserTypes.GetModel
				);
			case EnumRole.Restaurant:
				return RestaurantRegistrationData(
					req as Request & RestaurantTypes.GetPrivate
				);
			case EnumRole.Courier:
				return CourierRegistrationData(
					req as Request & CourierTypes.GetPrivate
				);
		}

		return null;
	},
};
