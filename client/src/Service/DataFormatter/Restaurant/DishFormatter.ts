import { DishTypes } from "../../../Types/DishTypes";
import { IDish } from "../../../interface/DishModel";
import BaseFormatter from "../BaseFormatter";

export const DishFormatter = {
	// TODO добавить type
	get(
		dish: IDish | IDish[]
	): DishTypes.outputDataDetails | DishTypes.outputDataDetails[] | null {
		if (Array.isArray(dish)) {
			return dish.map((dish: IDish) => {
				return BaseFormatter.getDishFields(
					dish
				) as DishTypes.outputDataDetails;
			});
		}

		return BaseFormatter.getDishFields(dish);
	},
};
