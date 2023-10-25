import { Request, Response } from "express";
import User from "../models/User";

class HomeController {
	async index(req: Request, res: Response) {
		// User.findUserByLogin("admin");

		console.log(User.createUser("alkash", "alkash@gmail.com", "12345"));

		User.findUserByLogin("admin")
			.then(user => {
				return res.status(200).send({
					user: user,
				});
			})
			.catch(error => {
				console.log(error);
				res.status(500).send({ error: error.message });
			});
	}
}

export default new HomeController();
