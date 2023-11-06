import { Request } from "express"; 
import { IUser } from "../../../interface/User/User";

async function getToken(req: Request & { user?: IUser }) {
	if (req.headers.authorization)
		return (req.headers.authorization as string).split(" ")[1];
	return null;
}
export default getToken;