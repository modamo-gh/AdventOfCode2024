import { readFileSync } from "fs";

const calibrationEquations = readFileSync("input.txt", "utf8")
	.trim()
	.split(/\n/);

const validEquations = new Set<string>();

for (const calibrationEquation of calibrationEquations) {
	let target: number;
	let operands: number[];

	const tokens = calibrationEquation.split(/:/);

	target = parseInt(tokens[0]);
	operands = tokens[1].trim().split(/\s+/).map(Number);

	let result = operands[0];
	let i = 1;

	const helper = (i: number) => {
		if (i === operands.length) {
			if (result === target) {
				validEquations.add(JSON.stringify({ target, operands }));
			}

			return;
		}

		for (let j = 0; j < 3; j++) {
			if (j === 0) {
				result += operands[i];
			} else if (j === 1) {
				result *= operands[i];
			} else if (j === 2) {
				result = parseInt(result.toString() + operands[i].toString());
			}

			helper(i + 1);

			if (j === 0) {
				result -= operands[i];
			} else if (j === 1) {
				result /= operands[i];
			} else if (j === 2) {
				result = parseInt(
					result
						.toString()
						.slice(0, -1 * operands[i].toString().length)
				);
			}
		}
	};

	helper(i);
}

let totalCalibrationResult = 0;

for (const validEquation of validEquations) {
	totalCalibrationResult += JSON.parse(validEquation).target;
}

console.log(totalCalibrationResult);
