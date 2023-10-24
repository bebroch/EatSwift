import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import { connectDB, disconnectDB } from "./database/connect";
import { PORT } from "./envinfo";
import routes from "./routes/index";

const app: Application = express();

connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

try {
	app.listen(PORT, (): void => {
		console.log(`Connected successfully on port ${PORT}`);
	});
} catch (error: any) {
	console.error(`Error occurred: ${error.message}`);
	disconnectDB();
}
