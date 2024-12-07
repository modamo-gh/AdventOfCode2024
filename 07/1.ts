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

	const add = (a: number, b: number) => {
		return a + b;
	};

	const subtract = (a: number, b: number) => {
		return a - b;
	};

	const multiply = (a: number, b: number) => {
		return a * b;
	};

	const divide = (a: number, b: number) => {
		return a / b;
	};

	const operators = [add, multiply];
	const undo = [subtract, divide];

	const helper = (i: number) => {
		if (i === operands.length) {
			if (result === target) {
				validEquations.add(JSON.stringify({ target, operands }));
			}

			return;
		}

		for (let j = 0; j < operators.length; j++) {
			result = operators[j](result, operands[i]);
			helper(i + 1);
			result = undo[j](result, operands[i]);
		}
	};

	helper(i);
}

let totalCalibrationResult = 0;

for (const validEquation of validEquations) {
	totalCalibrationResult += JSON.parse(validEquation).target;
}

console.log(totalCalibrationResult);
