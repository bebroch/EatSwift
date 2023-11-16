import { Request } from "express";
import { EnumRole } from "../../../interface/Account/Role";
import { UserTypes } from "../../../Types/UserTypes";
import { RestaurantTypes } from "../../../Types/RestaurantTypes";
import { CourierTypes } from "../../../Types/CourierTypes";
import { TAccount } from "../../../interface/Account";
import { ICourierFunctions } from "../../../interface/Courier";
import {
	IRestaurant,
	IRestaurantFunctions,
} from "../../../interface/Restaurant";
import { IUserFunctions } from "../../../interface/User";
import { outputLoginData } from "../../../Types/Auth/LoginTypes";

function getLoginData(req: Request): outputLoginData {
	const { login, password, role } = req.body;
	return { login, password, role };
}

function getModelData(data: any, accountPassword: string) {
	return { ...data, accountPassword };
}

function UserLoginData(req: Request & { account?: TAccount | null }) {
	const user = req.account as IUserFunctions | null;

	if (user) {
		const data = { user, ...getLoginData(req) };
		return {
			...getModelData(data, user.password),
		};
	}

	return {
		...getLoginData(req),
	};
}

function RestaurantLoginData(req: Request & { account?: TAccount | null }) {
	const restaurant = req.account as IRestaurantFunctions | null;

	if (restaurant) {
		const data = { restaurant, ...getLoginData(req) };
		return {
			...getModelData(data, restaurant.password),
		};
	}

	return {
		...getLoginData(req),
	};
}

function CourierLoginData(req: Request & { account?: TAccount | null }) {
	const courier = req.account as ICourierFunctions | null;

	if (courier) {
		const data = { courier, ...getLoginData(req) };
		return {
			...getModelData(data, courier.password),
		};
	}

	return {
		...getLoginData(req),
	};
}

export const LoginData = {
	getWithModel(
		req: Request & { account?: TAccount | null }
	): outputLoginData | undefined {
		const role = req.body.role;
		const account = req.account;

		if (!account) return undefined;

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

		return undefined;
	},

	get(req: Request): outputLoginData | undefined {
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

		return undefined;
	},
};
