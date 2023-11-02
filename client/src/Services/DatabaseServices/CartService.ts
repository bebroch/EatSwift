import { ObjectId } from "mongoose";
import User from "../../models/User";
import Dish from "../../models/Dish";
import { IDish } from "../../interface/Restaurant/Dish";

class CartService {
	async getCartDetails(userId: ObjectId) {
		const user = await User.findById(userId).populate("cart");

		if (!user) {
			throw new Error("User not found");
		}

		const cartItems = user.cart;

		const cartDetails = await Promise.all(
			cartItems.map(async item => {
				const dish = (await Dish.findById(item)) as IDish;
				return {
					_id: dish._id,
					name: dish.name,
					description: dish.description,
					ingredients: dish.ingredients,
					picture: dish.picture,
					price: dish.price,
				};
			})
		);

		return cartDetails;
	}
}

export default new CartService();
