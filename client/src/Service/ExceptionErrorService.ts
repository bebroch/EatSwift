import ERROR_MESSAGES from "../Message/Errors";
class ExceptionErrorService {
	static handler(error: any): never {
		throw new Error(error.message);
	}
}

export default ExceptionErrorService;
