import mongoose from "mongoose";
import Log from "../../Service/Log";
import ERROR_MESSAGES from "../../Message/Errors";

export function DataMethods(schema: mongoose.Schema) {
	schema.methods.getUserDataWithCart = async function () {
		Log.infoStack("User.getUserDataWithCart");

		const cart = await this.getCart();

		if (!cart) return { ...this.toObject() };

		return { ...this.toObject(), cart };
	};
}
