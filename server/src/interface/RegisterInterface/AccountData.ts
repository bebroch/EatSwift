import { TAccount } from "../Account/Account";
import { ICourierFunctions } from "../Courier/Courier";
import { IRestaurantFunctions } from "../Restaurant/Restaurant";
import { IUserFunctions } from "../User/User";

interface IAccountData {
	token: string;
	account: TAccount;
}

interface IUserAccountData extends IAccountData {
	account: IUserFunctions;
}

interface IRestaurantAccountData extends IAccountData {
	account: IRestaurantFunctions;
}

interface ICourierAccountData extends IAccountData {
	account: ICourierFunctions;
}

export {
	IAccountData,
	IUserAccountData,
	IRestaurantAccountData,
	ICourierAccountData,
};
