import { readFileSync } from "fs";

const map = readFileSync("input.txt", "utf8")
	.trim()
	.split(/\n/)
	.map((line) => line.split(""));
const visitedMap = Array.from({ length: map.length }, (row) =>
	new Array(map[0].length).fill([false, -1])
);

const directions = [
	{ dr: -1, dc: 0 },
	{ dr: 0, dc: 1 },
	{ dr: 1, dc: 0 },
	{ dr: 0, dc: -1 }
];

let guard = { r: -1, c: -1, d: 0 };

for (let r = 0; r < map.length; r++) {
	for (let c = 0; c < map[r].length; c++) {
		if (map[r][c] === "^") {
			[guard.r, guard.c] = [r, c];
		}
	}
}

const ogGuard = { ...guard };

const isInBounds = (r: number, c: number) => {
	return r >= 0 && r < map.length && c >= 0 && c < map[r].length;
};

let numberOfLoops = 0;

const resetVisitedMap = () => {
	for (let r = 0; r < visitedMap.length; r++) {
		for (let c = 0; c < visitedMap[r].length; c++) {
			visitedMap[r][c] = [false, -1];
		}
	}
};

for (let r = 0; r < map.length; r++) {
	for (let c = 0; c < map[r].length; c++) {
		if (map[r][c] === ".") {
			map[r][c] = "#";

			while (isInBounds(guard.r, guard.c)) {
				if (!visitedMap[guard.r][guard.c][0]) {
					visitedMap[guard.r][guard.c] = [true, guard.d];
				}

				const nextPotentialPosition = {
					r: guard.r + directions[guard.d].dr,
					c: guard.c + directions[guard.d].dc
				};

				if (
					!isInBounds(
						nextPotentialPosition.r,
						nextPotentialPosition.c
					)
				) {
					break;
				}

				if (
					visitedMap[nextPotentialPosition.r][
						nextPotentialPosition.c
					][0] &&
					guard.d ===
						visitedMap[nextPotentialPosition.r][
							nextPotentialPosition.c
						][1]
				) {
					numberOfLoops++;
					break;
				}

				if (
					map[nextPotentialPosition.r][nextPotentialPosition.c] ===
					"#"
				) {
					guard.d = (guard.d + 1) % directions.length;
				} else {
					[guard.r, guard.c] = [
						nextPotentialPosition.r,
						nextPotentialPosition.c
					];
				}
			}

			map[r][c] = ".";
			resetVisitedMap();
			guard = { ...ogGuard };
		}
	}
}

console.log(numberOfLoops);
