import ERROR_MESSAGES from "../../Message/Errors";
import OrderTypes from "../../Types/OrderTypes";
import Dish from "../../models/DishModel";
import ExceptionErrorService from "../ExceptionErrorService";

async function getDetails(cart: OrderTypes.GetDataForDetails) {
	const dishesData = cart.item.map(async dishData => {
		const dish = await Dish.findOne({ _id: dishData.dish_id }).lean();
		
		return { ...dishData, dish };
	});

	return { ...cart, item: await Promise.all(dishesData) };
}

export const OrderDataDetails = {
	async get(
		data:
			| OrderTypes.GetDataForDetails
			| OrderTypes.GetDataForDetails[]
			| null
	): Promise<
		OrderTypes.outputDataDetails | OrderTypes.outputDataDetails[] | null
	> {
		if (!data) return null;

		if (Array.isArray(data)) {
			const itemsData = data.map(cart => getDetails(cart));

			return await Promise.all(itemsData);
		}

		return await getDetails(data);
	},
};
// 3
