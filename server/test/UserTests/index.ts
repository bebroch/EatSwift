import RegistrationService from "../../src/Service/AuthService/RegistrationService";
import JsonService from "../Service/JsonService";
import Logger from "../Service/Logger";
import { DeleteTest } from "./DeleteTest";
import { LoginTest } from "./LoginTest";
import { RegistrationTest } from "./RegistrationTest";
import { LoginData } from "../../src/Service/GetData/Auth/LoginData";

async function UserTesting() {
    const UserData = await JsonService.getUserData();
    Logger.startMethod("UserTesting");

	const userData = await RegistrationTest(UserData.LoginData);
	await LoginTest(userData);

    await DeleteTest();
    
    Logger.endMethod("UserTesting");
}

export default UserTesting;
