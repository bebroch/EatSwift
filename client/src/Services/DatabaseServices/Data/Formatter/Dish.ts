import { IDish } from "../../../../interface/Restaurant/DIsh/DishModel";
import DataFormatter from "./DataFormatter";

class DataFormatterDish extends DataFormatter {
	getDishData(dish: IDish | IDish[]) {
		if (Array.isArray(dish)) {
			return dish.map((dish: any) => {
				return this.getBaseFieldsDish(dish);
			});
		}

		return this.getBaseFieldsDish(dish);
	}
}

const formatterDataDish = new DataFormatterDish();

export { DataFormatterDish, formatterDataDish };
