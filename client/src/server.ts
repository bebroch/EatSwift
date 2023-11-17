import express, { Application } from "express";
import bodyParser from "body-parser";
import { connectDB, disconnectDB } from "./database/connect";
import { PORT } from "./envInfo";
import routes from "./routes/index";
import Log from "./Service/Log";

const app: Application = express();

connectDB();

app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(routes);

try {
	app.listen(PORT, (): void => {
		Log.infoStack();
		Log.info(`Connected successfully on port ${PORT}`);
	});
} catch (error: any) {
	Log.error(error.message);
	disconnectDB();
}
