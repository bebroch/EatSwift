import OrderTypes from "../../../Types/OrderTypes";
import { IDish } from "../../../interface/Restaurant/DIsh/DishModel";
import DataFormatter from "../../DataFormatter";

export const OrderFormatter = {
	get(data: OrderTypes.GetDataDetails): OrderTypes.outputDataDetails {
		const itemData = data.item.map(item => {
			return {
				_id: item._id,
				dish: DataFormatter.Dish.get(item.dish) as IDish,
				quantity: item.quantity,
			};
		});

		return {
			user_id: data.user_id,
			restaurant_id: data.restaurant_id,
			item: itemData,
			status: data.status,
		};
	},
};
