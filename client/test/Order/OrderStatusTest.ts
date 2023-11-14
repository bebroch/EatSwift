import ERROR_MESSAGES from "../../src/Message/Errors";
import { OrderStatus } from "../../src/interface/User/Order";
import Logger from "../Service/Logger";

function comparison(status: string, orderStatus: string) {
	switch (status) {
		case OrderStatus.active:
			throw new Error(ERROR_MESSAGES.CANNOT_SET_STATUS_TO_ACTIVE);
		case OrderStatus.isProcessed:
			if (orderStatus !== OrderStatus.active)
				throw new Error(
					ERROR_MESSAGES.CANNOT_SET_STATUS_TO_IS_PROCESSED
				);
			break;
		case OrderStatus.delivered:
			if (orderStatus !== OrderStatus.isProcessed)
				throw new Error(ERROR_MESSAGES.CANNOT_SET_STATUS_TO_DELIVERED);
			break;
		case OrderStatus.completed:
			throw new Error(ERROR_MESSAGES.CANNOT_SET_STATUS_TO_COMPLETED);
		case OrderStatus.canceled:
			throw new Error(ERROR_MESSAGES.CANNOT_SET_STATUS_TO_CANCELED);
		default:
			throw new Error(ERROR_MESSAGES.INVALID_ORDER_STATUS);
	}
}

function OrderStatusTest() {
	for (const orderStatus in OrderStatus) {
		for (const status in OrderStatus) {
			try {
				comparison(status, orderStatus);

				Logger.success(
					`orderStatus:\t${orderStatus}\tstatus:\t${status}\tУСПЕШНО`
				);
			} catch (err: any) {
				Logger.error(
					`orderStatus:\t${orderStatus}\tstatus:\t${status}\terror:\t${err.message}`
				);
			}
		}
	}
}

export default OrderStatusTest;
