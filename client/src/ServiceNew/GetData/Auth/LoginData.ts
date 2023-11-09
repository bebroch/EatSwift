import { Request } from "express";
import { EnumRole } from "../../../interface/Account/Role";
import { outputLoginData } from "../../../Types/AuthTypes";
import { UserTypes } from "../../../Types/UserTypes";
import { RestaurantTypes } from "../../../Types/RestaurantTypes";
import { CourierTypes } from "../../../Types/CourierTypes";

function getLoginData(
	req: Request &
		(
			| UserTypes.GetModel
			| RestaurantTypes.GetPrivate
			| CourierTypes.GetPrivate
		)
): outputLoginData {
	const { login, password, role } = req.body;
	return { login, password, role };
}

function UserLoginData(req: Request & UserTypes.GetModel) {
	const user = req.user;
	return {
		user,
		accountPassword: user?.password,
		...getLoginData(req),
	};
}

function RestaurantLoginData(req: Request & RestaurantTypes.GetPrivate) {
	const restaurant = req.restaurant;
	return {
		restaurant,
		accountPassword: restaurant?.password,
		...getLoginData(req),
	};
}

function CourierLoginData(req: Request & CourierTypes.GetPrivate) {
	const courier = req.courier;
	return {
		courier,
		accountPassword: courier?.password,
		...getLoginData(req),
	};
}

export const LoginData = {
	get(
		req: Request &
			(
				| UserTypes.GetModel
				| RestaurantTypes.GetPrivate
				| CourierTypes.GetPrivate
			)
	): outputLoginData | null {
		const role = req.body.role;

		switch (role) {
			case EnumRole.User:
				return UserLoginData(req as Request & UserTypes.GetModel);
			case EnumRole.Restaurant:
				return RestaurantLoginData(
					req as Request & RestaurantTypes.GetPrivate
				);
			case EnumRole.Courier:
				return CourierLoginData(
					req as Request & CourierTypes.GetPrivate
				);
		}

		return null;
	},
};
