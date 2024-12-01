import { readFileSync } from "fs";

const lists = readFileSync("input.txt", "utf8").trim().split(/\n/);
const [leftList, rightList]: number[][] = [[], []];

for (const entry of lists) {
	const [leftEntry, rightEntry] = entry
		.trim()
		.split(/\s+/)
		.map((e) => parseInt(e));

	leftList.push(leftEntry);
	rightList.push(rightEntry);
}

leftList.sort((a, b) => a - b);
rightList.sort((a, b) => a - b);

const listLength = leftList.length;

let sumOfDistances = 0;

for (let i = 0; i < listLength; i++) {
	sumOfDistances += Math.abs(leftList[i] - rightList[i]);
}

console.log(sumOfDistances);
