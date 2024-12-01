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

const frequencyTable = new Map<number, number>();

for (const num of leftList) {
	frequencyTable.set(num, frequencyTable.get(num) || 0);
}

for (const num of rightList) {
	frequencyTable.set(num, (frequencyTable.get(num) || 0) + 1);
}

let similarityScore = 0;

for (const num of leftList) {
	similarityScore += num * frequencyTable.get(num)!;
}

console.log(similarityScore);
