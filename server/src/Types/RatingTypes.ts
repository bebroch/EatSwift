import { ObjectId } from "mongoose";
import { EntityTypeEnum } from "../Enums/Rating/EntityTypeEnum";

namespace RatingTypes {
	export type GetDataByEntity = {
		entity_type: EntityTypeEnum;
		entity_id: ObjectId;
	};

	// export type GetDataEntityByUser = GetDataByEntity & {
	// 	user_id: ObjectId;
	// };

	export type GetRestaurantForCreateRating = {
		restaurant_id: ObjectId;
		rating: number;
	};

	export type GetCourierForCreateRating = {
		courier_id: ObjectId;
		rating: number;
	};

	export type GetDataForFindRestaurant = {
		restaurant_id: ObjectId;
	};

	export type GetDataForFindCourier = {
		courier_id: ObjectId;
	};

	// export type GetDataForFindRestaurantByUser = GetDataForFindRestaurant & {
	// 	user_id: ObjectId;
	// };

	// export type GetDataForFindCourierByUser = GetDataForFindCourier & {
	// 	user_id: ObjectId;
	// };
}

export default RatingTypes;
