import { EnumRole } from "../interface/Account/Role";
import ITask from "../interface/Account/Task";

async function executeFunctionBasedOnRole(role: EnumRole, tasks: ITask) {
	switch (role) {
		case EnumRole.User:
			return await tasks.user();
		case EnumRole.Restaurant:
			return await tasks.restaurant();
		case EnumRole.Courier:
			return await tasks.courier();
	}

	return undefined;
}

export default executeFunctionBasedOnRole;
