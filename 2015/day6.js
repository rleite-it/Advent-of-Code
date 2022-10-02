const fs = require("fs");
const INSTRUCTIONS = fs.readFileSync("./day6.txt", "utf-8").split("\r\n");

const parseCommand = (_command) => {
	let command = _command.match(
		/(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/
	);

	return {
		command: command[1],
		x1: +command[2],
		y1: +command[3],
		x2: +command[4],
		y2: +command[5],
	};
};

const countLights = () => {
	let lights = new Uint8Array(1000 * 1000);

	INSTRUCTIONS.forEach((_instruction) => {
		let instruction = parseCommand(_instruction);

		for (let x = instruction.x1; x <= instruction.x2; x++) {
			for (let y = instruction.y1; y <= instruction.y2; y++) {
				let index = 1000 * x + y;

				switch (instruction.command) {
					case "turn on":
						lights[index] = 1;
						break;
					case "turn off":
						lights[index] = 0;
						break;
					case "toggle":
						lights[index] = lights[index] === 0 ? 1 : 0;
						break;
					default:
						break;
				}
			}
		}
	});

	const result = lights.reduce(
		(total, light) => (light === 0 ? total : ++total),
		0
	);

	console.log(result);
};

countLights();

const countLightsv2 = () => {
	let lights = new Uint8Array(1000 * 1000);

	INSTRUCTIONS.forEach((_instruction) => {
		let instruction = parseCommand(_instruction);

		for (let x = instruction.x1; x <= instruction.x2; x++) {
			for (let y = instruction.y1; y <= instruction.y2; y++) {
				let index = 1000 * x + y;

				switch (instruction.command) {
					case "turn on":
						lights[index] += 1;
						break;
					case "turn off":
						lights[index] = lights[index] === 0 ? 0 : lights[index] - 1;
						break;
					case "toggle":
						lights[index] += 2;
						break;
					default:
						break;
				}
			}
		}
	});

	const result = lights.reduce((brightness, light) => brightness + light, 0);

	console.log(result);
};

countLightsv2();
