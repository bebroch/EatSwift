import { TAccount } from "../../Account";
import { ICourier } from "../../Courier";
import { IRestaurant } from "../../Restaurant";
import { IUser } from "../../User";

interface IAccountData {
	token: string;
	account?: TAccount;
}

interface IUserAccountData extends IAccountData {
	account: IUser;
}

interface IRestaurantAccountData extends IAccountData {
	account: IRestaurant;
}

interface ICourierAccountData extends IAccountData {
	account: ICourier;
}

export {
	IAccountData,
	IUserAccountData,
	IRestaurantAccountData,
	ICourierAccountData,
};
