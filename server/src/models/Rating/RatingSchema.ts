import mongoose from "mongoose";
import { RatingMethods } from "./RatingMethods";
import { EntityTypeEnum } from "../../Enums/Rating/EntityTypeEnum";

const RatingSchema = new mongoose.Schema({
	entity_type: {
		type: String,
		enum: EntityTypeEnum,
		required: true,
	},
	entity_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
});

RatingMethods(RatingSchema);

export default RatingSchema;
