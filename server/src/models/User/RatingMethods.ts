import mongoose from "mongoose";
import Log from "../../Service/Log";
import RatingTypes from "../../Types/RatingTypes";
import Rating from "../RatingModel";
import { EntityTypeEnum } from "../../Enums/Rating/EntityTypeEnum";
import Courier from "../CourierModel";
import ExceptionErrorService from "../../Service/ExceptionErrorService";
import ERROR_MESSAGES from "../../Message/Errors";
import Restaurant from "../RestaurantModel";

export function RatingMethods(schema: mongoose.Schema) {
	schema.methods.getRatingRestaurant = async function (
		ratingData: RatingTypes.GetDataForFindRestaurant
	) {
		Log.infoStack("User.getRatingRestaurant");
		return await Rating.getAverageRatingByEntity({
			entity_type: EntityTypeEnum.restaurant,
			entity_id: ratingData.restaurant_id,
		});
	};

	schema.methods.getRatingCourier = async function (
		ratingData: RatingTypes.GetDataForFindCourier
	) {
		Log.infoStack("User.getRatingCourier");
		return await Rating.getAverageRatingByEntity({
			entity_type: EntityTypeEnum.courier,
			entity_id: ratingData.courier_id,
		});
	};

	schema.methods.giveRatingRestaurant = async function (
		ratingData: RatingTypes.GetRestaurantForCreateRating
	) {
		Log.infoStack("User.giveRatingRestaurant");
		const { restaurant_id, rating } = ratingData;
		const restaurant = await Restaurant.findOne({ _id: restaurant_id });

		if (!restaurant)
			ExceptionErrorService.handler(ERROR_MESSAGES.RESTAURANT_NOT_FOUND);

		await Rating.createRating({
			entity_type: EntityTypeEnum.restaurant,
			entity_id: restaurant_id,
			user_id: this._id,
			rating,
		});
	};

	schema.methods.giveRatingCourier = async function (
		ratingData: RatingTypes.GetCourierForCreateRating
	) {
		Log.infoStack("User.giveRatingCourier");
		const { courier_id, rating } = ratingData;
		const courier = await Courier.findOne({ _id: courier_id });

		if (!courier)
			ExceptionErrorService.handler(ERROR_MESSAGES.COURIER_NOT_FOUND);

		await Rating.createRating({
			entity_type: EntityTypeEnum.courier,
			entity_id: courier_id,
			user_id: this._id,
			rating,
		});
	};
}
// 1
