import { readFileSync } from "fs";

const memory = readFileSync("input.txt", "utf8").trim();
const matches = memory.matchAll(/mul\((\d+),(\d+)\)/g);

let sumOfInstructions = 0;

for (const match of matches) {
	sumOfInstructions += parseInt(match[1]) * parseInt(match[2]);
}

console.log(sumOfInstructions);
