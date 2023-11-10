import mongoose from "mongoose";
import GetData from "../../Service/GetData";
import DataFormatter from "../../Service/DataFormatter";
import DetailsService from "../../Service/DetailsService";

export function DataMethods(schema: mongoose.Schema) {
	schema.methods.getRestaurantData = async function () {
		const menu = await DetailsService.Menu.getManyWithDish(
			await this.getMenus()
		);
		return {
			...this._doc,
			menu,
		};
	};
}
