import mongoose from "mongoose";

export function DataMethods(schema: mongoose.Schema) {
	schema.methods.getRestaurantData = async function () {
		return {
			...this._doc,
			menu: await this.getMenus(),
		};
	};
}
