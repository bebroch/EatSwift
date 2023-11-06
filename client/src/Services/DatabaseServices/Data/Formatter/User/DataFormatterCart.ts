import { ICartItem } from "../../../../../interface/User/User";
import { DataFormatterDish } from "../Restaurant/Dish";

class DataFormatterCart extends DataFormatterDish {
	getCartData(cart: ICartItem | ICartItem[]) {
		if (Array.isArray(cart)) {
			return cart.map(item => {
				return {
					...this.getBaseFieldsCart(item),
					dish: this.getDishData(item.dish),
				};
			});
		}

		return {
			...this.getBaseFieldsCart(cart),
			dish: this.getDishData(cart.dish),
		};
	}
}

const formatterDataCart = new DataFormatterCart();

export { DataFormatterCart, formatterDataCart };
