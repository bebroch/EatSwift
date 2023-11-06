import { Request } from "express";
import Restaurant from "../../../../models/Restaurant";
import {
	IRestaurant,
	IRestaurantFunctions,
} from "../../../../interface/Restaurant/Restaurant";
import { TAccount } from "../../../../interface/Account/Account";

async function getAccount() {}

async function getRestaurantFromParams(
	req: Request & { login?: string }
): Promise<IRestaurantFunctions | null> {
	const { loginFromParams } = req.params;
	const login = req.login;

	if (login) {
		return await Restaurant.findAccountByLogin(login);
	}

	if (loginFromParams) {
		return await Restaurant.findAccountByLogin(loginFromParams);
	}

	return null;
}

function getRestaurantFromAccount(
	req: Request & { account?: TAccount }
): IRestaurantFunctions | null {
	const restaurant = req.account;
	return restaurant as IRestaurantFunctions;
}

export { getRestaurantFromParams, getRestaurantFromAccount };
