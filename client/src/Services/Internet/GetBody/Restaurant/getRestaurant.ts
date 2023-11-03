import { Request } from "express";
import Restaurant from "../../../../models/Restaurant";
import { IRestaurant } from "../../../../interface/Restaurant/Restaurant";

async function getRestaurant(req: Request): Promise<IRestaurant | null> {
	const { login } = req.params;
	const restaurant = await Restaurant.findAccountByLogin(login);
	return restaurant;
}

export default getRestaurant;
