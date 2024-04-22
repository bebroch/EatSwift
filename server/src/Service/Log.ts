import winston from "winston";

const logger = winston.createLogger({
	format: winston.format.combine(
		winston.format.simple(),
		winston.format.metadata()
	),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({
			filename: "Logs/error.log",
			level: "error",
		}),
	],
});

class Log {
	static infoStack(message: string = "") {
		const stack = new Error().stack as string;
		const stackLines = stack.split("\n");
		const secondToLastLine = stackLines[2];
		Log.info(message, secondToLastLine);
	}

	static info(...args: string[]) {
		const infoMessage = args.join(" ");
		logger.info(infoMessage);
	}

	static warn(...args: string[]) {
		const warningMessage = args.join(" ");
		logger.warn(warningMessage);
	}

	static error(...args: any[]) {
		const errorMessage = args.join(" ");
		logger.error(errorMessage, { stack: new Error().stack });
	}
}

export default Log;
