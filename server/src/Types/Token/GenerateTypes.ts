import { ObjectId } from "mongoose";
import { EnumRole } from "../../interface/Account/Role";

type TokenData = {
	login: ObjectId | string;
	role: EnumRole;
};

type outputTokenDataOrNull = TokenData | null;

export { TokenData, outputTokenDataOrNull };
