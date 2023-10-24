import mongoose from "mongoose";

const User = mongoose.model(
	"Mongays",
	new mongoose.Schema({
		name: String,
		email: String,
	})
);

export { User };
