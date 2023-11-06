import mongoose from "mongoose";
import { getUserWithCartDetails } from "../../Services/DatabaseServices/Data/getWithDetails/Cart/getUserWithCartDetails";
import { IUserFunctions } from "../../interface/User/User";

export function DataMethods(schema: mongoose.Schema) {
	schema.methods.getUserDataWithCart = async function () {
		const user = await getUserWithCartDetails(this as IUserFunctions);

		return user;
	};
}
