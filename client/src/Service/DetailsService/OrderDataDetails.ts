import ERROR_MESSAGES from "../../Message/Errors";
import OrderTypes from "../../Types/OrderTypes";
import Dish from "../../models/DishModel";

export const OrderDataDetails = {
	async get(
		data: OrderTypes.GetDataForDetails
	): Promise<OrderTypes.outputDataDetails> {
		const itemData = data.item.map(async item => {
			const dish = await Dish.findById(item.dish_id);

			if (!dish) {
				throw new Error(ERROR_MESSAGES.DISH_NOT_FOUND);
			}

			return {
				_id: item._id,
				dish,
				quantity: item.quantity,
			};
		});

		return {
			user_id: data.user_id,
			restaurant_id: data.restaurant_id,
			item: await Promise.all(itemData),
			status: data.status,
		};
	},
};
