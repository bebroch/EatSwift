import { DishTypes } from "../../../Types/DishTypes";
import { IDish } from "../../../interface/Restaurant/DIsh/DishModel";
import BaseFormatter from "../BaseFormatter";

export const DishFormatter = {
	// TODO добавить type
	get(
		dish: IDish | IDish[] | null
	): DishTypes.outputDataDetails | DishTypes.outputDataDetails[] | null {
		if (!dish) return null;

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
