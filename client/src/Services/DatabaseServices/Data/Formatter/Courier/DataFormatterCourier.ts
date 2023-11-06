import { ICourier } from "../../../../../interface/Courier/Courier";
import DataFormatter from "../DataFormatter";

class DataFormatterCourier extends DataFormatter {
	getCourierData(courier: ICourier) {
		const { firstName, lastName, phoneNumber } = courier;

		return {
			...this.getAccountBaseFields(courier),
			firstName,
			lastName,
			phoneNumber,
		};
	}
}

export default new DataFormatterCourier();
