import { Request } from "express";
import Restaurant from "../../../../models/Restaurant";
import { IRestaurant } from "../../../../interface/Restaurant/Restaurant";
import { TAccount } from "../../../../interface/Account/Account";

async function getRestaurantFromParams(
	req: Request & { login?: string }
): Promise<IRestaurant | null> {
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

async function getRestaurantFromAccount(
	req: Request & { account?: TAccount }
): Promise<IRestaurant | null> {
	const restaurant = req.account;
	return restaurant as IRestaurant;
}

export { getRestaurantFromParams, getRestaurantFromAccount };
