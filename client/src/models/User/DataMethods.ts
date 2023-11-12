import mongoose from "mongoose";

export function DataMethods(schema: mongoose.Schema) {
	schema.methods.getUserDataWithCart = async function () {
		return {
			...this._doc,
			cart: await this.getCart(),
		};
	};
}
