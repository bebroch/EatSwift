import { IMenu } from "../../../../interface/Restaurant/Menu";
import DataFormatterDish from "./Dish";

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

export default DataFormatterMenu;
