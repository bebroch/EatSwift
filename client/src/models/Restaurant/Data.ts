import mongoose from "mongoose";
import GetData from "../../Service/GetData";
import DataFormatter from "../../Service/DataFormatter";
import DetailsService from "../../Service/DetailsService";

export function DataMethods(schema: mongoose.Schema) {
	schema.methods.getRestaurantData = async function () {
		const menu = await DetailsService.Menu.getManyWithDish(
			await this.getMenus()
		);

		const dish = await DetailsService.Dish.getMany(await this.getDishes());

		return {
			...this._doc,
			menu,
			dish,
		};
	};
}
