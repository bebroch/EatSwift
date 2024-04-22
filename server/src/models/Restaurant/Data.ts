import mongoose from "mongoose";
import GetData from "../../Service/GetData";
import DataFormatter from "../../Service/DataFormatter";
import DetailsService from "../../Service/DetailsService";
import Log from "../../Service/Log";
import Rating from "../RatingModel";
import Restaurant from "../RestaurantModel";
import { EntityTypeEnum } from "../../Enums/Rating/EntityTypeEnum";

export function DataMethods(schema: mongoose.Schema) {
	schema.methods.getRestaurantData = async function () {
		Log.infoStack("Restaurant.getRestaurantData");

		const menu = await DetailsService.Menu.getManyWithDish(
			await this.getMenus()
		);

		const dish = await DetailsService.Dish.getMany(await this.getDishes());

		const rating = await Rating.getAverageRatingByEntity({
			entity_type: EntityTypeEnum.restaurant,
			entity_id: this._id,
		});

		return {
			...this.toObject(),
			rating,
			menu,
			dish,
		};
	};
}
