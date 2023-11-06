import { IMenu } from "../../../../../interface/Restaurant/Menu/MenuModel";
import { DataFormatterDish } from "./Dish";

class DataFormatterMenu extends DataFormatterDish {
	// Меню
	getMenuData(menu: IMenu | Array<IMenu>) {
		if (Array.isArray(menu)) {
			return menu.map((menu: any) => {
				return {
					...this.getBaseFieldsMenu(menu),
					dish: this.getDishData(menu.dish),
				};
			});
		}

		return {
			...this.getBaseFieldsMenu(menu),
			dish: this.getDishData(menu.dish),
		};
	}
}

const formatterDataMenu = new DataFormatterMenu();

export { DataFormatterMenu, formatterDataMenu };
