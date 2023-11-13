import { Request } from "express";

export const OrderData = {
	get(req: Request) {
		const { _id } = req.params;
		return { order_id: _id };
	},
};
