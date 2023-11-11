import { Request, Response } from "express";
import { IRestaurantFunctions } from "../../interface/Restaurant/Restaurant";
import Status from "../../Service/Status";
import ERROR_MESSAGES from "../../Message/Errors";
import SUCCESS_MESSAGE from "../../Message/Success";
import GetData from "../../Service/GetData";
import { DishTypes } from "../../Types/DishTypes";
import DataFormatter from "../../Service/DataFormatter";

class DishController {
	async getDishesFromPublicRestaurant(req: Request, res: Response) {
		const restaurant = GetData.Restaurant.getPublic(
			req
		) as IRestaurantFunctions;

		const dishes = await restaurant.getDishes();
		const dishesDataFormatted = DataFormatter.Dish.get(dishes);

		return Status.success(res, dishesDataFormatted);
	}

	async getDishFromPublicRestaurant(req: Request, res: Response) {
		const dishData = GetData.Dish.FindOne(req);
		const restaurant = GetData.Restaurant.getPublic(
			req
		) as IRestaurantFunctions;

		const dish = await restaurant.getDish(dishData);

		if (!dish) {
			return Status.notFound(res, ERROR_MESSAGES.DISH_NOT_FOUND);
		}

		const dishDataFormatted = DataFormatter.Dish.get(dish);

		return Status.success(res, dishDataFormatted);
	}

	async getDishes(req: Request, res: Response) {
		const restaurant = GetData.Restaurant.getPrivate(
			req
		) as IRestaurantFunctions;
		const dishes = await restaurant.getDishes();
		const dishesDataFormatted = DataFormatter.Dish.get(dishes);
		return Status.success(res, dishesDataFormatted);
	}

	async getDish(req: Request, res: Response) {
		const restaurant = GetData.Restaurant.getPrivate(
			req
		) as IRestaurantFunctions;
		const dishData = GetData.Dish.FindOne(req);

		const dish = await restaurant.getDish(dishData);
		const dishDataFormatted = DataFormatter.Dish.get(dish);

		return Status.success(res, dishDataFormatted);
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
		const dishDataFormatted = DataFormatter.Dish.get(dish);

		return Status.success(res, dishDataFormatted);
	}

	async deleteDish(req: Request, res: Response) {
		const restaurant = GetData.Restaurant.getPrivate(
			req
		) as IRestaurantFunctions;

		const dishData = GetData.Dish.Delete(req);

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
