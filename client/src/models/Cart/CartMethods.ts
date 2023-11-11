import mongoose from "mongoose";
import ValidateService from "../../Service/ValidateService";
import CartTypes from "../../Types/CartTypes";
import ERROR_MESSAGES from "../../Message/Errors";
import { ICart, ICartItem } from "../../interface/User/Cart";
import { ObjectId } from "mongoose";

export const CartMethods = function (schema: mongoose.Schema) {
	schema.statics.getCart = async function (userId: string) {
		return await this.findOne({ user_id: userId });
	};

	schema.statics.addToCart = async function (
		dishData: CartTypes.GetAddToCart
	) {
		const { dish_id, restaurant_id, user_id } = dishData;

		await ValidateService.Cart.checkExistData({
			dish_id,
			restaurant_id,
			user_id,
		});

		const cart = await this.findOne({ user_id, restaurant_id });

		if (cart) {
			const existDishIndex = cart.item.findIndex((item: ICartItem) => {
				return item.dish_id.toString() === dish_id.toString();
			});

			if (existDishIndex !== -1) {
				cart.item[existDishIndex].quantity += 1;
			} else {
				cart.item.push({
					dish_id,
				});
			}
		} else {
			this.create({ restaurant_id, user_id, item: [{ dish_id }] });
		}
	};

	schema.statics.deleteItemFromCart = async function (
		dishData: CartTypes.GetDataForDelete
	) {
		const { dish_id, user_id, restaurant_id } = dishData;

		await ValidateService.Cart.checkExistData({
			dish_id,
			restaurant_id,
			user_id,
		});

		const cart = await this.findOne({ user_id, restaurant_id });

		if (cart) {
			const existDishIndex = cart.item.findIndex((item: ICartItem) => {
				return item.dish_id.toString() === dish_id.toString();
			});

			if (existDishIndex !== -1) {
				cart.item.splice(existDishIndex, 1);
				return;
			}

			throw new Error(ERROR_MESSAGES.DISH_NOT_FOUND_IN_CART);
		}

		throw new Error(ERROR_MESSAGES.CART_NOT_FOUND);
	};
};
