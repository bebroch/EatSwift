class Logger {
	reset = "\x1b[0m";
	red = "\x1b[31m";
	green = "\x1b[32m";
	yellow = "\x1b[33m";

	private logMessage(prefix: string, message: string) {
		console.log(`${prefix}${message}${this.reset}`);
	}

	private static lineCount = 50;

	startMethod(methodName: string) {
		const line = "-".repeat((Logger.lineCount - methodName.length) / 2);
		this.logMessage(this.yellow, `\\/${line}${methodName}${line}\\/`);
	}

	endMethod(methodName: string) {
		const line = "-".repeat((Logger.lineCount - methodName.length) / 2);
		this.logMessage(this.yellow, `/\\${line}${methodName}${line}/\\`);
	}

	message(message: string) {
		console.log(message);
	}

	success(message: string) {
		this.logMessage(this.green, message);
	}

	error(message: string) {
		this.logMessage(this.red, message);
	}

	createError(message: string) {
		this.error(message);
		throw new Error(message);
	}
}

export default new Logger();
