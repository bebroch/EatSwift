import Courier from "../../src/models/CourierModel";
import Logger from "../Service/Logger";

export async function DeleteTest() {
	try {
		Logger.startMethod("DeleteAccountTest");

		Logger.message("Удаление...");
		await Courier.deleteOne({ login: "TestAccount" });
		Logger.success("Курьер удален!");

		Logger.endMethod("DeleteAccountTest");
		Logger.success("Тест прошёл успешно!");
	} catch (err: any) {
		Logger.endMethod("DeleteAccountTest");
		Logger.error("Произошла ошибка при удалении.");
		Logger.createError(err);
	}
}
