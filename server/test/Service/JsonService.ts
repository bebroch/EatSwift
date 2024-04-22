import * as fs from "fs/promises";
import * as path from "path";

class JsonService {
	private async getData(fileName: string) {
		const filePath = path.resolve(__dirname, "..", "Data", fileName);
		const data = await fs.readFile(filePath, "utf-8");
		const parseData = JSON.parse(data);

		return parseData;
	}

	async getUserData() {
		return await this.getData("UserData.json");
	}

	async getRestaurantData() {
		return await this.getData("RestaurantData.json");
	}

	async getCourierData() {
		return await this.getData("CourierData.json");
	}
}

export default new JsonService();
