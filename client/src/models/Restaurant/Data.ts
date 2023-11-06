import mongoose from "mongoose";
import { getMenusWithDishDetails } from "../../Services/DatabaseServices/Data/Menu/getMenuWithDishDetails";

export function DataMethods(schema: mongoose.Schema) {
	schema.methods.getRestaurantData = async function () {
		const menu = await getMenusWithDishDetails(await this.getMenus());
		return {
			...this._doc,
			menu,
		};
	};
}
