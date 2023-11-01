import { EnumRole } from "../interface/Account/Role";
import ITask from "../interface/Account/Task";

async function executeFunctionBasedOnRole(role: EnumRole, tasks: ITask) {
	switch (role) {
		case EnumRole.User:
			return tasks.user;
		case EnumRole.Restaurant:
			return tasks.restaurant;
		case EnumRole.Courier:
			return tasks.courier;
	}
}

export default executeFunctionBasedOnRole;
