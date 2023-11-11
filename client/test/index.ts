import { RegistrationTest } from "./Auth/RegisterTest";
import { connectDB, disconnectDB } from "../src/database/connect";

async function index() {
	connectDB();
	await RegistrationTest();
	disconnectDB();
}

index();
