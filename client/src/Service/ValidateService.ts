import { CartValidate } from "./Validation/CartValidate";
import { LoginValidate } from "./Validation/LoginValidate";
import { RegistrationValidate } from "./Validation/RegistrationValidate";

class ValidateService {
	static Login = LoginValidate;
	static Registration = RegistrationValidate;
	static Cart = CartValidate;
}

export default ValidateService;
