import { IDish } from "../../../interface/Restaurant/DIsh/DishModel";
import BaseFormatter from "../BaseFormatter";

export const DishFormatter = {
	// TODO добавить type
	get(dish: IDish | IDish[]) {
		if (Array.isArray(dish)) {
			return dish.map((dish: any) => {
				return BaseFormatter.getDishFields(dish);
			});
		}

		return BaseFormatter.getDishFields(dish);
	},
};
