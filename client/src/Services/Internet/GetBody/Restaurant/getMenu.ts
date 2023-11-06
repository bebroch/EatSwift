import { Request } from "express";
import { IRestaurantFunctions } from "../../../../interface/Restaurant/Restaurant";
import { IMenu } from "../../../../interface/Restaurant/Menu/MenuModel";

async function getMenuFromRequest(
	req: Request,
	restaurant: IRestaurantFunctions
) {
	const id = req.params.id as string;

	const menu = restaurant.getMenu({ _id: id });

	return menu;
}

export default getMenuFromRequest;
