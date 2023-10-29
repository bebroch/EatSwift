import dotenv from "dotenv";
import mongoose from "mongoose";

const envFilePath = "../.env";
dotenv.config({ path: envFilePath });

const MONGO_USERNAME: string = process.env.MONGO_USERNAME ?? "username";
const MONGO_PASSWORD: string = process.env.MONGO_PASSWORD ?? "password";
const MONGO_DATABASE: string = process.env.MONGO_DATABASE ?? "database";
const DATABASE_HOST: string = process.env.DATABASE_HOST ?? "host";
const PORT: number = (process.env.PORT ?? 5000) as number;
const SECRET_KEY: string = process.env.SECRET_KEY ?? "secret";
const SALT: number = (process.env.SALT ?? 10) as number;
const SALT_STRING: string = process.env.SALT_STRING ?? "$2a$10$secret";

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
	SALT,
	SALT_STRING,
};
