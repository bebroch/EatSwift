import { IDish } from "../../../../../interface/Restaurant/DIsh/DishModel";
import { IMenu } from "../../../../../interface/Restaurant/Menu/MenuModel";
import Dish from "../../../../../models/DishModel";

async function getMenusWithDishDetails(menus: IMenu[]) {
	const menusData = await Promise.all(
		menus.map(async menu => {
			const menuData = await Promise.all(
				menu.dish.map(async dish_id => {
					const dish = await Dish.findById(dish_id);
					return dish;
				})
			);

			menu.dish = menuData as IDish[];
			return menu;
		})
	);

	return menusData;
}

async function getMenuWithDishDetails(menu: IMenu) {
	const menuData = await Promise.all(
		menu.dish.map(async dish_id => {
			const dish = await Dish.findById(dish_id);
			return dish;
		})
	);

	menu.dish = menuData as IDish[];

	return menu;
}

export { getMenuWithDishDetails, getMenusWithDishDetails };
