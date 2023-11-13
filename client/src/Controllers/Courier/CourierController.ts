import { Request, Response } from "express";
import Status from "../../Service/Status";
import GetData from "../../Service/GetData";
import DataFormatter from "../../Service/DataFormatter";
import { ICourierFunctions } from "../../interface/Courier/Courier";

class CourierController {
	async getPublicCourierProfile(req: Request, res: Response) {
		const courier = GetData.Courier.getPublic(req) as ICourierFunctions;
		const courierDataFormatted = DataFormatter.Courier.get(courier);
		return Status.success(res, courierDataFormatted);
	}
}

export default new CourierController();
