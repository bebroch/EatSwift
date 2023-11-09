import { GetRegistrationData } from "../../Types/AuthTypes";
import { CourierRegistrationData } from "./Registration/CourierRegistrationData";
import { RestaurantRegistrationData } from "./Registration/RestaurantRegistrationData";
import { UserRegistrationData } from "./Registration/UserRegistrationData";

export const RegistrationValidate = {
	User: UserRegistrationData,
	Restaurant: RestaurantRegistrationData,
	Courier: CourierRegistrationData,

	isEmpty(data: GetRegistrationData): boolean {
		return !data;
	},
};
