import mongoose from "mongoose";
import Log from "../../Service/Log";
import ERROR_MESSAGES from "../../Message/Errors";

export function DataMethods(schema: mongoose.Schema) {
	schema.methods.getUserDataWithCart = async function () {
		Log.infoStack("User.getUserDataWithCart");

		try {
			const cart = await this.getCart();
			return { ...this.toObject(), cart };
		} catch (error) {
			return { ...this.toObject() };
		}
	};
}
