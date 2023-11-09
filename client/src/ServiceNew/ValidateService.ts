import { LoginValidate } from "./Validation/LoginValidate";
import { RegistrationValidate } from "./Validation/RegistrationValidate";

class ValidateService {
	static Login = LoginValidate;
	static Registration = RegistrationValidate;
}

export default ValidateService;
