import { Request } from "express";
import { IMenu, IMenuData } from "../../../../interface/Restaurant/Menu";

async function getMenuData(req: Request): Promise<IMenuData> {
	const { name, description } = req.body;
	return { name, description };
}

export default getMenuData;
