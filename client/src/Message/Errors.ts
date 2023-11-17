const ERROR_MESSAGES = {
	BAD_REQUEST: {
		message: "Bad request",
		statusCode: 400,
	},
	NOT_FOUND: {
		message: "Not found",
		statusCode: 404,
	},
	ACCESS_DENIED: {
		message: "Access denied",
		statusCode: 403,
	},
	UN_AUTHORIZED: {
		message: "Unauthorized",
		statusCode: 401,
	},
	INTERNAL_SERVER_ERROR: {
		message: "Internal server error",
		statusCode: 500,
	},
	LOGIN_PASSWORD_REQUIRED: {
		message: "Login and password are required",
		statusCode: 400,
	},
	USER_NOT_FOUND: {
		message: "User not found",
		statusCode: 404,
	},
	USER_ALREADY_EXISTS: {
		message: "User already exists",
		statusCode: 409,
	},
	PASSWORD_MISMATCH: {
		message: "Password and confirmation do not match",
		statusCode: 400,
	},
	MISSING_REQUIRED_FIELDS: {
		message: "One or more required fields are missing",
		statusCode: 400,
	},
	INVALID_TOKEN: {
		message: "Invalid token payload",
		statusCode: 401,
	},
	LOGIN_OR_PASSWORD_REQUIRED: {
		message: "Login or password are required",
		statusCode: 400,
	},
	INVALID_LOGIN_OR_PASSWORD: {
		message: "Invalid login or password",
		statusCode: 401,
	},
	INVALID_ROLE: {
		message: "Invalid role",
		statusCode: 400,
	},
	DISH_NOT_FOUND: {
		message: "Dish not found",
		statusCode: 404,
	},
	ACCOUNT_ALREADY_EXISTS: {
		message: "Account already exists",
		statusCode: 409,
	},
	ACCOUNT_NOT_FOUND: {
		message: "Account not found",
		statusCode: 404,
	},
	ACCOUNT_NOT_CREATED: {
		message: "Account not created",
		statusCode: 500,
	},
	DISH_NOT_FOUND_IN_CART: {
		message: "Dish not found in cart",
		statusCode: 404,
	},
	RESTAURANT_NOT_FOUND: {
		message: "Restaurant not found",
		statusCode: 404,
	},
	MENU_NOT_CREATED: {
		message: "Menu not created",
		statusCode: 500,
	},
	MENU_NOT_FOUND: {
		message: "Menu not found",
		statusCode: 404,
	},
	MENU_ID_AND_DISH_ID_REQUIRED: {
		message: "menu_id and dish_id are required",
		statusCode: 400,
	},
	INVALID_LOGIN_DATA: {
		message: "Invalid login data",
		statusCode: 401,
	},
	INVALID_REGISTRATION_DATA: {
		message: "Invalid registration data",
		statusCode: 400,
	},
	DISH_NOT_FOUND_IN_RESTAURANT: {
		message: "Dish not found in restaurant",
		statusCode: 404,
	},
	INCORRECT_DATA: {
		message: "Incorrect data",
		statusCode: 400,
	},
	CART_NOT_FOUND: {
		message: "Cart not found",
		statusCode: 404,
	},
	ORDER_ALREADY_EXIST: {
		message: "Order already exists",
		statusCode: 409,
	},
	ORDER_NOT_EXIST: {
		message: "Order not exist",
		statusCode: 404,
	},
	ORDER_NOT_FOUND: {
		message: "Order not found",
		statusCode: 404,
	},
	ORDER_ALREADY_CANCELLED: {
		message: "Order already cancelled",
		statusCode: 409,
	},
	COURIER_NOT_FOUND: {
		message: "Courier not found",
		statusCode: 404,
	},
	CANNOT_SET_STATUS_TO_ACTIVE: {
		message: "Cannot set status to active in order",
		statusCode: 400,
	},
	CANNOT_SET_STATUS_TO_IS_PROCESSED: {
		message: "Cannot set status to isProcessed in order",
		statusCode: 400,
	},
	CANNOT_SET_STATUS_TO_DELIVERED: {
		message: "Cannot set status to delivered in order",
		statusCode: 400,
	},
	CANNOT_SET_STATUS_TO_COMPLETED: {
		message: "Cannot set status to completed in order",
		statusCode: 400,
	},
	CANNOT_SET_STATUS_TO_CANCELED: {
		message: "Cannot set status to canceled in order",
		statusCode: 400,
	},
	INVALID_ORDER_STATUS: {
		message: "Invalid order status",
		statusCode: 400,
	},
	ORDER_ALREADY_TAKEN: {
		message: "Order already taken",
		statusCode: 409,
	},
	INVALID_PASSWORD: {
		message: "Invalid password",
		statusCode: 400,
	},
	ORDER_CANCELED: {
		message: "Order canceled",
		statusCode: 410,
	},
	ACCOUNT_CREATION_FAILED: {
		message: "Account creation failed",
        statusCode: 500,
	}
};

export default ERROR_MESSAGES;
