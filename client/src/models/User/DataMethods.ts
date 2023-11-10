import mongoose from "mongoose";
import { IUserFunctions } from "../../interface/User/User";
import DetailsService from "../../Service/DetailsService";

export function DataMethods(schema: mongoose.Schema) {
	schema.methods.getUserDataWithCart = async function () {
		const user = await DetailsService.User.getWithCart(
			this as IUserFunctions
		);

		return user;
	};
}
