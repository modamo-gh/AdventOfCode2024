import { readFileSync } from "fs";

const wordSearch = readFileSync("input.txt", "utf8")
	.trim()
	.split(/\n/)
	.map((line) => line.split(""));

let numberOfXmasAppearances = 0;

const checkX = (i: number, j: number) => {
	const leftToRightDiagonal = [];
	const rightToLeftDiagonal = [];

	if (
		i - 1 >= 0 &&
		i + 1 < wordSearch.length &&
		j - 1 >= 0 &&
		j + 1 < wordSearch[i].length
	) {
		for (let k = -1; k < 2; k++) {
			leftToRightDiagonal.push(wordSearch[i + k][j + k]);
			rightToLeftDiagonal.push(wordSearch[i + k * -1][j + k]);
		}
	}

	const leftToRightWord = leftToRightDiagonal.join("");
	const rightToLeftWord = rightToLeftDiagonal.join("");

	if (
		(leftToRightWord === "SAM" || leftToRightWord === "MAS") &&
		(rightToLeftWord === "SAM" || rightToLeftWord === "MAS")
	) {
		numberOfXmasAppearances++;
	}
};

for (let i = 0; i < wordSearch.length; i++) {
	for (let j = 0; j < wordSearch[i].length; j++) {
		if (wordSearch[i][j] === "A") {
			checkX(i, j);
		}
	}
}

console.log(numberOfXmasAppearances);
