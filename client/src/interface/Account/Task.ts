import { ICourier } from "../Courier/Courier";
import { IRestaurant } from "../Restaurant/Restaurant";
import { IUser } from "../User/User";

interface ITask {
	user: IUser | null;
	restaurant: IRestaurant | null;
	courier: ICourier | null;
}

export default ITask;
