import OrderTypes from "../../../Types/OrderTypes";
import { IDish } from "../../../interface/DishModel";
import DataFormatter from "../../DataFormatter";
import BaseFormatter from "../BaseFormatter";

function getFormattedData(cart: OrderTypes.GetDataDetails) {
	const itemData = cart.item.map(item => {
		return {
			...BaseFormatter.getOrderItemFields(item),
			dish: DataFormatter.Dish.get(item.dish) as IDish,
		};
	});

	return { ...BaseFormatter.getOrderFields(cart), item: itemData };
}

export const OrderFormatter = {
	get(
		data: OrderTypes.GetDataDetails | OrderTypes.GetDataDetails[] | null
	): OrderTypes.outputDataDetails | OrderTypes.outputDataDetails[] | null {
		if (!data) {
			return null;
		}

		if (Array.isArray(data)) {
			const itemsData = data.map(cart => getFormattedData(cart));
			return itemsData as OrderTypes.outputDataDetails[];
		}

		return getFormattedData(data) as OrderTypes.outputDataDetails;
	},
};
