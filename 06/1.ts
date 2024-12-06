import { readFileSync } from "fs";

const map = readFileSync("input.txt", "utf8")
	.trim()
	.split(/\n/)
	.map((line) => line.split(""));
const visitedMap = Array.from({ length: map.length }, (row) =>
	new Array(map[0].length).fill(false)
);

const directions = [
	{ dr: -1, dc: 0 },
	{ dr: 0, dc: 1 },
	{ dr: 1, dc: 0 },
	{ dr: 0, dc: -1 }
];

const guardPosition = { r: -1, c: -1 };

for (let r = 0; r < map.length; r++) {
	for (let c = 0; c < map[r].length; c++) {
		if (map[r][c] === "^") {
			[guardPosition.r, guardPosition.c] = [r, c];
		}
	}
}

const isInBounds = (r: number, c: number) => {
	return r >= 0 && r < map.length && c >= 0 && c < map[r].length;
};

let currentDirection = 0;

while (isInBounds(guardPosition.r, guardPosition.c)) {
	visitedMap[guardPosition.r][guardPosition.c] = true;

	const nextPotentialPosition = {
		r: guardPosition.r + directions[currentDirection].dr,
		c: guardPosition.c + directions[currentDirection].dc
	};

	if (!isInBounds(nextPotentialPosition.r, nextPotentialPosition.c)) {
		break;
	}

	if (map[nextPotentialPosition.r][nextPotentialPosition.c] === "#") {
		currentDirection = (currentDirection + 1) % directions.length;
	} else {
		[guardPosition.r, guardPosition.c] = [
			nextPotentialPosition.r,
			nextPotentialPosition.c
		];
	}
}

console.log(visitedMap.flat(1).filter((visited) => visited === true).length);
