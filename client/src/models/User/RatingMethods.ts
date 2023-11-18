import mongoose from "mongoose";
import Log from "../../Service/Log";
import RatingTypes from "../../Types/RatingTypes";
import Rating from "../RatingModel";
import { EntityTypeEnum } from "../../Enums/Rating/EntityTypeEnum";

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

		await Rating.createRating({
			entity_type: EntityTypeEnum.courier,
			entity_id: courier_id,
			user_id: this._id,
			rating,
		});
	};
}
// 1
