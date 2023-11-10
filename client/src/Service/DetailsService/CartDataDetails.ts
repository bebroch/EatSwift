import { IDish } from "../../interface/Restaurant/DIsh/DishModel";
import { GetCart } from "../../interface/User/Cart";
import { ICartItem } from "../../interface/User/User";
import Dish from "../../models/DishModel";

export const CartDataDetails = {
	async get(cart: GetCart) {
		const CartItems = await Promise.all(
			cart.map(async (item: ICartItem) => {
				const dishData = await Dish.findOne({ _id: item.dish });
				item.dish = dishData as IDish;
				return item;
			})
		);

		cart = CartItems as ICartItem[];

		return cart;
	},
};
