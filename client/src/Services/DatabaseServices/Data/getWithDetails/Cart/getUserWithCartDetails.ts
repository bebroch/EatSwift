import { IDish } from "../../../../../interface/Restaurant/DIsh/DishModel";
import { ICartItem, IUserFunctions } from "../../../../../interface/User/User";
import Dish from "../../../../../models/DishModel";

async function getUserWithCartDetails(user: IUserFunctions) {
	const userCartData = await Promise.all(
		user.cart.map(async cart => {
			const dishData = await Dish.findOne({ _id: cart.dish });
			cart.dish = dishData as IDish;
			return cart;
		})
	);

	user.cart = userCartData as ICartItem[];

	return user;
}

export { getUserWithCartDetails };
