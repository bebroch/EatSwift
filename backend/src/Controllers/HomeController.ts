import { Request, Response } from "express";
import User from "../models/User";
import Status from "../Services/Status";
import Dish from "../models/Dish";
import Restaurant from "../models/Restaurant";
import { ObjectId } from "mongoose";
import { IRestaurant } from "../interface/Restaurant";

class HomeController {
	async index(req: Request, res: Response) {
		const restaurant = (await Restaurant.findOne({
			name: "asdasdasd",
		})) as IRestaurant;

		const dish = await Dish.createDish({
			restaurant_id: restaurant._id as ObjectId,
			name: "X",
			description: "Pizza",
			ingredients: ["Pizza"],
			picture: "Pizza",
			price: 10,
		});

		return Status.success(res, { restaurant, dish });
	}
}

export default new HomeController();
