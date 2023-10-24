import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

const envFilePath = '../.env';

dotenv.config({ path: envFilePath });

const app: Application = express();
const PORT = 3000;

const MONGO_URL = process.env.MONGO_URL;

if (MONGO_URL) mongoose.connect(MONGO_URL);

const User = mongoose.model(
	"User",
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
