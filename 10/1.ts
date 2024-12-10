import { readFileSync } from "fs";

const topographicalMap = readFileSync("input.txt", "utf8")
	.trim()
	.split(/\n/)
	.map((line) => line.split("").map(Number));

let sumOfAllTrailheadScores = 0;

const dfs = (
	r: number,
	c: number,
	scoreKeep: { score: number },
	visited: Set<string>
) => {
	if (
		topographicalMap[r][c] === 9 &&
		!visited.has(JSON.stringify({ r, c }))
	) {
		visited.add(JSON.stringify({ r, c }));
		scoreKeep.score++;
		return;
	}

	const directions = [
		{ dr: -1, dc: 0 },
		{ dr: 0, dc: 1 },
		{ dr: 1, dc: 0 },
		{ dr: 0, dc: -1 }
	];

	for (const direction of directions) {
		const newRow = r + direction.dr;
		const newColumn = c + direction.dc;

		if (
			newRow >= 0 &&
			newRow < topographicalMap.length &&
			newColumn >= 0 &&
			newColumn < topographicalMap[newRow].length &&
			topographicalMap[newRow][newColumn] === topographicalMap[r][c] + 1
		) {
			dfs(newRow, newColumn, scoreKeep, visited);
		}
	}

	return scoreKeep;
};

for (let r = 0; r < topographicalMap.length; r++) {
	for (let c = 0; c < topographicalMap[r].length; c++) {
		if (topographicalMap[r][c] === 0) {
			let scoreKeep = { score: 0 };

			const trailheadScore = dfs(
				r,
				c,
				scoreKeep,
				new Set<string>()
			)!.score;

			sumOfAllTrailheadScores += trailheadScore;
		}
	}
}

console.log(sumOfAllTrailheadScores);
