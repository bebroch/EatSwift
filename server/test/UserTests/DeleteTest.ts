import User from "../../src/models/UserModel";
import Logger from "../Service/Logger";

export async function DeleteTest() {
	try {
		Logger.startMethod("DeleteAccountTest");

		Logger.message("Удаление...");
		await User.deleteOne({ login: "TestAccount" });
		Logger.success("Пользователь удален!");

		Logger.endMethod("DeleteAccountTest");
		Logger.success("Тест прошёл успешно!");
	} catch (err: any) {
		Logger.endMethod("DeleteAccountTest");
		Logger.error("Произошла ошибка при удалении.");
		Logger.createError(err);
	}
}
