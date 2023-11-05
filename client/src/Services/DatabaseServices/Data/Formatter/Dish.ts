import { IDish } from "../../../../interface/Restaurant/Dish";
import DataFormatter from "./DataFormatter";

class DataFormatterDish extends DataFormatter {
	getDish(dish: IDish | IDish[]) {
		if (Array.isArray(dish)) {
			return dish.map((dish: any) => {
				return this.getBaseFieldsDish(dish);
			});
		}

		return this.getBaseFieldsDish(dish);
	}
}

export default DataFormatterDish;
