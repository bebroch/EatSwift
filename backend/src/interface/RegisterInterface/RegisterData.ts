interface IRegisterData {
	login?: string;
	name?: string;
	firstName?: string;
	lastName?: string;
	email: string;
	password: string;
	confirmPassword: string;
	role: string;
}

interface IUserRegisterData extends IRegisterData {
	login: string;
}

interface IRestaurantRegisterData extends IRegisterData {
	name: string;
}

interface ICourierRegisterData extends IUserRegisterData {
	firstName: string;
	lastName: string;
}

export {
	IRegisterData,
	IUserRegisterData,
	IRestaurantRegisterData,
	ICourierRegisterData,
};
