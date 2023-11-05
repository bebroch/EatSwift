import { IMenu } from "../../../../interface/Restaurant/Menu";
import DataFormatterDish from "./Dish";

class DataFormatterMenu extends DataFormatterDish {
	// Меню
	getMenu(menu: IMenu | Array<IMenu>) {
		if (Array.isArray(menu)) {
			return menu.map(async (menu: any) => {
				return {
					...this.getBaseFieldsMenu(menu),
					dish: this.getDish(menu.dish),
				};
			});
		}

		return {
			...this.getBaseFieldsMenu(menu),
			dish: this.getDish(menu.dish),
		};
	}
}

export default DataFormatterMenu;
