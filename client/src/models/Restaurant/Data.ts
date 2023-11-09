import mongoose from "mongoose";
import GetData from "../../ServiceNew/GetData";
import DataFormatter from "../../ServiceNew/DataFormatter";
import DetailsService from "../../ServiceNew/DetailsService";

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
