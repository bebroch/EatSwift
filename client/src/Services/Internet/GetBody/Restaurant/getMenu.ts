import { Request } from "express";
import { IRestaurant } from "../../../../interface/Restaurant/Restaurant";
import { IMenu } from "../../../../interface/Restaurant/Menu";

async function getMenu(req: Request, restaurant: IRestaurant) {
	const id = req.params.id as string;
	const menu = restaurant.menu.find(
		(item: IMenu) => item._id.toString() === id
	);

	return menu;
}

export default getMenu;
