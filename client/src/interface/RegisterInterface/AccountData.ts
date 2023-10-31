import { ICourier } from "../Courier";
import { IRestaurant } from "../Restaurant";
import { IUser } from "../User";

interface IAccountData {
	token: string;
}

interface IUserAccountData extends IAccountData {
	user: IUser;
}

interface IRestaurantAccountData extends IAccountData {
	restaurant: IRestaurant;
}

interface ICourierAccountData extends IAccountData {
	courier: ICourier;
}

export {
	IAccountData,
	IUserAccountData,
	IRestaurantAccountData,
	ICourierAccountData,
};
