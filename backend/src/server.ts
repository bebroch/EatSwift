import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { MONGO_URL } from "./envinfo";

const app: Application = express();
const PORT = 5000;

if (MONGO_URL) mongoose.connect(MONGO_URL);

const User = mongoose.model(
	"Mongays",
	new mongoose.Schema({
		name: String,
		email: String,
	})
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response): Promise<Response> => {
	return res.status(200).send({
		message: "Hello World Updated!",
	});
});

try {
	app.listen(PORT, (): void => {
		console.log(`Connected successfully on port ${PORT}`);
	});
} catch (error: any) {
	console.error(`Error occurred: ${error.message}`);
}
