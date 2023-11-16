import { IDish } from "../../interface/DishModel";
import { IMenu } from "../../interface/MenuModel";
import Dish from "../../models/DishModel";

export const MenuDataDetails = {
	async getManyWithDish(menus: IMenu[]) {
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
	},
	async getOneWithDish(menu: IMenu) {
		const menuData = await Promise.all(
			menu.dish.map(async dish_id => {
				const dish = await Dish.findById(dish_id);
				return dish;
			})
		);

		menu.dish = menuData as IDish[];

		return menu;
	},
};
