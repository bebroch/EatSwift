import Dish from "../../../../models/Dish";
import { IDish } from "../../../../interface/Restaurant/DIsh/DishModel";
import { ICartItem, IUserFunctions } from "../../../../interface/User/User";

class CartService {
	async getCartDetails(user: IUserFunctions) {
		const cartItems = user.cart;

		const cartDetails = await Promise.all(
			cartItems.map(async (cartItem: ICartItem) => {
				const dish = (await Dish.findById(cartItem.dish)) as IDish;
				return {
					dish: {
						_id: dish._id,
						name: dish.name,
						description: dish.description,
						ingredients: dish.ingredients,
						picture: dish.picture,
						price: dish.price,
					},
					quantity: cartItem.quantity,
				};
			})
		);

		return cartDetails;
	}
}

export default new CartService();
