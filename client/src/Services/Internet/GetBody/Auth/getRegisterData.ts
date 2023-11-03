import { Request } from "express";
import { IRegisterData } from "../../../../interface/RegisterInterface/RegisterData";

async function getRegisterData(req: Request): Promise<IRegisterData> {
	return req.body;
}

export default getRegisterData;
