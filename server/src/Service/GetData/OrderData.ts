import { Request } from "express";

export const OrderData = {
	get(req: Request) {
		const { _id } = req.params;
		return { order_id: _id };
	},
	getStatus(req: Request) {
		const { status } = req.body;
		return { ...this.get(req), status };
	},
	getForTakeOrder(req: Request) {
		const { order_id } = req.body;
		return { order_id };
	},
	getForUpdateStatus(req: Request) {
		const { status } = req.body;
		return { status };
	},
	getFromHistory(req: Request) {
		const { _id } = req.params;
		return { order_id: _id };
	},
};
