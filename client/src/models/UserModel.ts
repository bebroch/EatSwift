import mongoose from "mongoose";
import { IUser, IUserModel } from "../interface/User";
import UserSchema from "./User/UserSchema";

const User = mongoose.model<IUser, IUserModel>("User", UserSchema);

export default User;
