import { Model, ObjectId } from "mongoose";
import RatingTypes from "../../Types/RatingTypes";
import { EntityTypeEnum } from "../../Enums/Rating/EntityTypeEnum";

interface IRating {
	entity_type: EntityTypeEnum;
	entity_id: ObjectId;
	user_id: ObjectId;
	rating: number;
}

interface IRatingFunctions extends IRating {}

interface IRatingModel extends Model<IRatingFunctions> {
	createRating(ratingData: IRating): Promise<IRating>;
	findRatingByEntity(
		ratingData: RatingTypes.GetDataByEntity
	): Promise<IRating[]>;
	getAverageRatingByEntity(
		ratingData: RatingTypes.GetDataByEntity
	): Promise<IRating>;
}

export { IRating, IRatingFunctions, IRatingModel };
