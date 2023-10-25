import dotenv from "dotenv";
import mongoose from "mongoose";

const envFilePath = "../.env";
dotenv.config({ path: envFilePath });

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DATABASE = process.env.MONGO_DATABASE;
const DATABASE_HOST = process.env.DATABASE_HOST;
const PORT = process.env.PORT ?? 5000;
const SECRET_KEY = process.env.SECRET_KEY ?? "secret";

const MONGO_URL =
	"mongodb://" +
	MONGO_USERNAME +
	":" +
	MONGO_PASSWORD +
	"@" +
	DATABASE_HOST +
	":27017/" +
	MONGO_DATABASE +
	"?authSource=admin";

export {
	MONGO_USERNAME,
	MONGO_PASSWORD,
	MONGO_DATABASE,
	MONGO_URL,
	PORT,
	SECRET_KEY,
};
