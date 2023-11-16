import { IMenu } from "../../../interface/MenuModel";
import DataFormatter from "../../DataFormatter";
import BaseFormatter from "../BaseFormatter";

export const MenuFormatter = {
	// TODO Добавить type IMenu | Array<IMenu>
	get(menu: IMenu | Array<IMenu>) {
		if (Array.isArray(menu)) {
			return menu.map((menu: any) => {
				return this.getOne(menu);
			});
		}

		return this.getOne(menu);
	},

	getOne(menu: IMenu) {
		return {
			...BaseFormatter.getMenuFields(menu),
			dish: DataFormatter.Dish.get(menu.dish),
		};
	},
};
