import { ObjectId } from "mongoose";
import { EnumRole } from "../../interface/Account/Role";

namespace GenerateTypes {
	export type TokenData = {
		login: ObjectId | string;
		role: EnumRole;
	};

	export type outputTokenDataOrNull = TokenData | null;
}

export default GenerateTypes;
