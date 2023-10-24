import { Request, Response } from "express";
import User from "../models/User";

class HomeController {
	async index(req: Request, res: Response) {
		const user = new User({
			login: "admin",
			email: "<EMAIL>",
			password: "<PASSWORD>",
			verified: true,
		});

		console.log(user);

		user.save()
			.then(user => {
				console.log("Пользователь успешно создан");
				return res.status(200).send({
					message: "Пользователь успешно создан!",
				});
			})
			.catch(err => {
				console.log("Ошибка создания пользователя:", err);
				return res.status(500).send({
					message: "Ошибка создания пользователя!",
				});
			});
	}
}

export default new HomeController();
