import { Request, Response } from "express";
import { IRestaurantFunctions } from "../../interface/Restaurant/Restaurant";
import Status from "../../ServiceNew/Status";
import ERROR_MESSAGES from "../../Message/Errors";
import SUCCESS_MESSAGE from "../../Message/Success";
import GetData from "../../ServiceNew/GetData";
import { DishTypes } from "../../Types/DishTypes";
import DataFormatter from "../../ServiceNew/DataFormatter";

class DishController {
	async getDishes(req: Request, res: Response) {
		const restaurant = GetData.Restaurant.getPrivate(
			req
		) as IRestaurantFunctions;
		const dishes = await restaurant.getDishes();
		const dishesDataFormatted = DataFormatter.Dish.get(dishes);
		return Status.success(res, dishesDataFormatted);
	}

	async getDish(
		req: Request | (Request & DishTypes.GetDataForFindOne),
		res: Response
	) {
		const restaurant = GetData.Restaurant.getPrivate(
			req
		) as IRestaurantFunctions;
		const dishData = GetData.Dish.FindOne(
			req as Request & DishTypes.GetDataForFindOne
		);
		const dishes = await restaurant.getDish(dishData);
		return Status.success(res, dishes);
	}

	async createDish(
		req: Request | (Request & DishTypes.GetDataForCreate),
		res: Response
	) {
		const restaurant = GetData.Restaurant.getPrivate(
			req
		) as IRestaurantFunctions;
		const dishDataForCreate = GetData.Dish.Create(
			req as Request & DishTypes.GetDataForCreate
		);
		const dish = await restaurant.createDish(dishDataForCreate);
		return Status.success(res, dish);
	}

	async deleteDish(
		req: Request | (Request & DishTypes.GetDataForDelete),
		res: Response
	) {
		const restaurant = GetData.Restaurant.getPrivate(
			req
		) as IRestaurantFunctions;

		const dishData = GetData.Dish.Delete(
			req as Request & DishTypes.GetDataForDelete
		);

		try {
			await restaurant.deleteDish(dishData);
			return Status.success(
				res,
				SUCCESS_MESSAGE.DISH_SUCCESSFULLY_DELETED_FROM_RESTAURANT
			);
		} catch (err: any) {
			if (err.message === ERROR_MESSAGES.DISH_NOT_FOUND) {
				return Status.notFound(res, ERROR_MESSAGES.DISH_NOT_FOUND);
			}
			return Status.internalError(
				res,
				ERROR_MESSAGES.INTERNAL_SERVER_ERROR
			);
		}
	}
}

export default new DishController();
// 1
