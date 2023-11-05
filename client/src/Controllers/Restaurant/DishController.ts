import { Request, Response } from "express";
import { getRestaurantFromAccount } from "../../Services/Internet/GetBody/Restaurant/getRestaurant";
import { IRestaurantFunctions } from "../../interface/Restaurant/Restaurant";
import {
	getDishDataForCreate,
	getDishDataForDelete,
	getDishDataForFind,
} from "../../Services/Internet/GetBody/Restaurant/getDishData";
import {
	IDishDataForCreate,
	IDishDataForDelete,
	IDishDataForFindOne,
} from "../../interface/Restaurant/Dish";
import Status from "../../Services/Internet/Status";
import ERROR_MESSAGES from "../../Message/Errors";
import SUCCESS_MESSAGE from "../../Message/Success";
import DataFormatterRestaurant from "../../Services/DatabaseServices/Data/Formatter/DataFormatterRestaurant";

class DishController {
	async getDishes(req: Request, res: Response) {
		const restaurant = (await getRestaurantFromAccount(
			req
		)) as IRestaurantFunctions;
		const dishes = await restaurant.getDishes();
		const dishesDataFormatted = DataFormatterRestaurant.getDishData(dishes);
		return Status.success(res, dishesDataFormatted); // TODO: Выделить  { dish: dishes } в отедльный метод, DataFormatter
	}

	async getDish(
		req: Request | (Request & IDishDataForFindOne),
		res: Response
	) {
		const restaurant = (await getRestaurantFromAccount(
			req
		)) as IRestaurantFunctions;
		const dishData = await getDishDataForFind(
			req as Request & IDishDataForFindOne
		);
		const dishes = await restaurant.getDish(dishData);
		return Status.success(res, dishes);
	}

	async createDish(
		req: Request | (Request & IDishDataForCreate),
		res: Response
	) {
		const restaurant = (await getRestaurantFromAccount(
			req
		)) as IRestaurantFunctions;
		const dishDataForCreate = await getDishDataForCreate(
			req as Request & IDishDataForCreate
		);
		const dish = await restaurant.createDish(dishDataForCreate);
		return Status.success(res, dish);
	}

	async deleteDish(
		req: Request | (Request & IDishDataForDelete),
		res: Response
	) {
		const restaurant = (await getRestaurantFromAccount(
			req
		)) as IRestaurantFunctions;

		const dishData = await getDishDataForDelete(
			req as Request & IDishDataForDelete
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
