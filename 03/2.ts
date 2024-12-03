import { readFileSync } from "fs";

const memory = readFileSync("input.txt", "utf8").trim();
const matches = [...memory.matchAll(/mul\((\d+),(\d+)\)|don't\(\)|do\(\)/g)];

let sumOfInstructions = 0;
let addProduct = true;

for (let i = 0; i < matches.length; i++) {
	const match = matches[i];

	if (match[0].startsWith(`don't`)) {
        addProduct = false;
	} else if (match[0].startsWith("do")) {
		addProduct = true;
	} else if(match[0].startsWith("mul") && addProduct) {
		sumOfInstructions += parseInt(match[1]) * parseInt(match[2]);
	}
}

console.log(sumOfInstructions);
