import { Request } from "express";
import Restaurant from "../../../../models/Restaurant";
import { IRestaurant } from "../../../../interface/Restaurant/Restaurant";
import { TAccount } from "../../../../interface/Account/Account";

async function getRestaurantFromParams(
	req: Request
): Promise<IRestaurant | null> {
	const { login } = req.params;
	const restaurant = await Restaurant.findAccountByLogin(login);
	return restaurant;
}

async function getRestaurantFromAccount(
	req: Request & { account?: TAccount }
): Promise<IRestaurant | null> {
	const restaurant = req.account;
	return restaurant as IRestaurant;
}

export { getRestaurantFromParams, getRestaurantFromAccount };
