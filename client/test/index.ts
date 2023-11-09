async function index() {
	const test = {
		name: "test",
		email: "<EMAIL>",
		password: "<PASSWORD>",
		cart: [
			"600000000000001000000",
			"60000000000000000000000",
			"60000000000000000000000",
			"600000000000001000000",
			"60000000000000000000000",
			"60000000000000000000000",
		],
	};

	const test1 = test.cart.map(cart => {
		if (cart === "600000000000001000000") {
			cart = "666";
		}

		console.log(cart);

		return cart;
	});

	console.log(test1);
}

index();
