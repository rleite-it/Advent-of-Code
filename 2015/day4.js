const md5 = require("md5");
const input = "ckczppom";

// First part of the problem
const findNumder = () => {
	for (let i = 1; i < Infinity; i++) {
		let str = input;
		str += i;

		str = md5(str);

		if (str.substring(0, 5) === "00000") {
			return i;
		}
	}
};

console.log(findNumder());
