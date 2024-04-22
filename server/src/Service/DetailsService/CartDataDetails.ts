import ERROR_MESSAGES from "../../Message/Errors";
import CartTypes from "../../Types/CartTypes";
import { ICart } from "../../interface/User/Cart";
import Dish from "../../models/DishModel";
import DetailsService from "../DetailsService";
import ExceptionErrorService from "../ExceptionErrorService";

export const CartDataDetails = {
	async get(cart: ICart[]): Promise<CartTypes.outputDataDetails[] | null> {
		const CartItems = cart.map(async cartItem => {
			const cartItemData = cartItem.item.map(async dishes => {
				const dish = await DetailsService.Dish.get(dishes.dish_id);

				return {
					_id: dishes._id,
					dish,
					quantity: dishes.quantity,
				};
			});

			return {
				user_id: cartItem.user_id,
				restaurant_id: cartItem.restaurant_id,
				item: await Promise.all(cartItemData),
			};
		});

		return (await Promise.all(CartItems)) as CartTypes.outputDataDetails[];
	},
};
