import mongoose from "mongoose";
import ERROR_MESSAGES from "../../Message/Errors";
import { IDish } from "../../interface/Restaurant/DIsh/DishModel";
import { ICartItem } from "../../interface/User/User";
import Dish from "../DishModel";
import Order from "../OrderModek";

export function CartMethods(schema: mongoose.Schema) {
	schema.methods.getCart = async function () {
		return this.cart;
	};
	schema.methods.getOrders = async function () {
		const orders = await Order.find({ user_id: this._id });
		return orders;
	};
	schema.methods.addToCart = async function (dishData: IDish) {
		const dish = await Dish.findOne(dishData);

		if (!dish) {
			throw new Error(ERROR_MESSAGES.DISH_NOT_FOUND);
		}

		const existingCartItemIndex = this.cart.findIndex(
			(cartItem: ICartItem) => {
				return cartItem.dish.toString() === dish._id.toString();
			}
		);

		if (existingCartItemIndex !== -1) {
			this.cart[existingCartItemIndex].quantity += 1;
		} else {
			this.cart.push({
				dish: dish._id,
				quantity: 1,
			});
		}

		return this.save();
	};
	schema.methods.deleteItemFromCart = async function (item: IDish) {
		const dish = await Dish.findOne(item);

		if (!dish) {
			throw new Error(ERROR_MESSAGES.DISH_NOT_FOUND);
		}

		const itemIndex = this.cart.findIndex((cartItem: ICartItem) => {
			return cartItem.dish.toString() === dish._id.toString();
		});

		if (itemIndex !== -1) {
			this.cart[itemIndex].quantity -= 1;
			if (this.cart[itemIndex].quantity === 0) {
				this.cart.splice(itemIndex, 1);
			}
			this.save();
		} else {
			throw new Error(ERROR_MESSAGES.DISH_NOT_FOUND_IN_CART);
		}
	};
}
