import mongoose from "mongoose";
import Log from "../../Service/Log";
import { IRating } from "../../interface/Rating/Rating";
import RatingTypes from "../../Types/RatingTypes";
import ExceptionErrorService from "../../Service/ExceptionErrorService";
import ERROR_MESSAGES from "../../Message/Errors";

export function RatingMethods(schema: mongoose.Schema) {
	schema.statics.createRating = async function (ratingData: IRating) {
		Log.infoStack("Rating.createRating");
		const { entity_type, entity_id, user_id, rating } = ratingData;

		const existingRating = await this.findOne({
			entity_type,
			entity_id,
			user_id,
		});

		if (existingRating)
			ExceptionErrorService.handler(ERROR_MESSAGES.RATING_ALREADY_EXISTS);

		const newRating = new this({ entity_type, entity_id, user_id, rating });

		if (!newRating)
			ExceptionErrorService.handler(ERROR_MESSAGES.RATING_NOT_CREATED);

		return newRating.save();
	};

	schema.statics.findRatingByEntity = async function (
		ratingData: RatingTypes.GetDataByEntity
	) {
		Log.infoStack("Rating.findRatingByEntity");
		const { entity_type, entity_id } = ratingData;
		const rating = this.find({ entity_type, entity_id });
		if (!rating)
			ExceptionErrorService.handler(ERROR_MESSAGES.RATING_NOT_FOUND);
		return rating;
	};

	schema.statics.getAverageRatingByEntity = async function (
		ratingData: RatingTypes.GetDataByEntity
	) {
		const { entity_type, entity_id } = ratingData;
		const result = await this.aggregate([
			{
				$match: {
					entity_type,
					entity_id,
				},
			},
			{
				$group: {
					_id: null,
					averageRating: { $avg: "$rating" },
					count: { $sum: 1 },
				},
			},
		]);

		if (result.length === 0) return 0;

		return result[0].averageRating;
	};
}
