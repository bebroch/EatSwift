import ERROR_MESSAGES from "../Message/Errors";
import Log from "./Log";
class ExceptionErrorService {
	static handler(error: any): never {
		Log.error(error.message);
		throw new Error(error.message);
	}
}

export default ExceptionErrorService;
