class Log {
	static reset = "\x1b[0m";
	static red = "\x1b[31m";
	static green = "\x1b[32m";
	static yellow = "\x1b[33m";

	private logMessage(prefix: string, message: string) {
		console.log(`${prefix}${message}${Log.reset}`);
	}

	private static lineCount = 50;

	startMethod(methodName: string) {
		const line = "-".repeat((Log.lineCount - methodName.length) / 2);
		this.logMessage(Log.yellow, `\\/${line}${methodName}${line}\\/`);
	}

	endMethod(methodName: string) {
		const line = "-".repeat((Log.lineCount - methodName.length) / 2);
		this.logMessage(Log.yellow, `/\\${line}${methodName}${line}/\\`);
	}

	message(message: string) {
		console.log(message);
	}

	success(message: string) {
		this.logMessage(Log.green, message);
	}

	error(message: string) {
		this.logMessage(Log.red, message);
	}
}

export default new Log();
