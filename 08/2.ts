import { readFileSync } from "fs";

const map = readFileSync("input.txt", "utf8")
	.trim()
	.split(/\n/)
	.map((line) => line.trim().split(""));

const antennas = [];

for (let row = 0; row < map.length; row++) {
	for (let column = 0; column < map[row].length; column++) {
		if (map[row][column] !== ".") {
			antennas.push({ row, column, frequency: map[row][column] });
		}
	}
}

const uniqueAntinodeLocations = new Set<string>();

for (let i = 0; i < antennas.length; i++) {
	for (let j = 0; j < antennas.length; j++) {
		if (
			(antennas[i].column !== antennas[j].column ||
				antennas[i].row !== antennas[j].row) &&
			antennas[i].frequency === antennas[j].frequency
		) {
			const dc = antennas[j].column - antennas[i].column;
			const dr = antennas[j].row - antennas[i].row;

			let multiplier = 0;

			let potentialAntinodeColumn = antennas[j].column + multiplier * dc;
			let potentialAntinodeRow = antennas[j].row + multiplier * dr;

			while (
				potentialAntinodeRow >= 0 &&
				potentialAntinodeRow < map.length &&
				potentialAntinodeColumn >= 0 &&
				potentialAntinodeColumn < map[potentialAntinodeRow].length
			) {
				uniqueAntinodeLocations.add(
					JSON.stringify({
						potentialAntinodeRow,
						potentialAntinodeColumn
					})
				);

				multiplier++;

				potentialAntinodeColumn = antennas[j].column + multiplier * dc;
				potentialAntinodeRow = antennas[j].row + multiplier * dr;
			}
		}
	}
}

console.log(uniqueAntinodeLocations.size);
