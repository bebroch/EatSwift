import { Request, Response, NextFunction } from "express";
import { SECRET_KEY } from "../envinfo";
import IUser from "../interface/User";
import jwt from "jsonwebtoken";

function generateToken(user: IUser) {
	const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: 604800 });
	return token;
}

function LoginMiddleware(req: Request, res: Response, next: NextFunction) {
	const { login, password } = req.body;
	
    if (!login || !password) {
        return res.status(400).json({
            message: "Login and password are required",
        });
	}
	
    const user = {
        login: login,
        password: password,
    };
    User.findOne(user)
        .then((user) => {
            if (!user) {
                return res.status(400).json({
                    message: "Login and password are incorrect",
                });
            }
            req.user = user;
            next();
        })
        .catch((err) => {
            return res.status(500).json({
                message: err.message,
            });
        });
}

function RegistrationMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {}

export { LoginMiddleware, RegistrationMiddleware };
