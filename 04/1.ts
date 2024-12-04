import { readFileSync } from "fs";

const wordSearch = readFileSync("input.txt", "utf8")
	.trim()
	.split(/\n/)
	.map((line) => line.split(""));

let numberOfXmasAppearances = 0;

const directions = [
	{ i: -1, j: 0 },
	{ i: -1, j: 1 },
	{ i: 0, j: 1 },
	{ i: 1, j: 1 },
	{ i: 1, j: 0 },
	{ i: 1, j: -1 },
	{ i: 0, j: -1 },
	{ i: -1, j: -1 }
];

const checkDirection = (i: number, di: number, j: number, dj: number) => {
	if (
		i + 3 * di >= 0 &&
		i + 3 * di < wordSearch.length &&
		j + 3 * dj >= 0 &&
		j + 3 * dj < wordSearch[i].length
	) {
		let word = "";

		for (let k = 0; k < 4; k++) {
			word += wordSearch[i + k * di][j + k * dj];
		}

		if (word === "XMAS") {
			numberOfXmasAppearances++;
		}
	}
};

for (let i = 0; i < wordSearch.length; i++) {
	for (let j = 0; j < wordSearch[i].length; j++) {
		if (wordSearch[i][j] === "X") {
			for (const direction of directions) {
				checkDirection(i, direction.i, j, direction.j);
			}
		}
	}
}

console.log(numberOfXmasAppearances);
