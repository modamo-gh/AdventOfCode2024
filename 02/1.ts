import { readFileSync } from "fs";

const reports = readFileSync("input.txt", "utf8")
	.trim()
	.split(/\n/)
	.map((report) => report.split(/\s/).map((level) => parseInt(level)));

let numberOfSafeReports = 0;

const isIncreasing = (report: number[]) => {
	for (let i = 0; i < report.length - 1; i++) {
		if (report[i] >= report[i + 1]) {
			return false;
		}
	}

	return true;
};

const isDecreasing = (report: number[]) => {
	for (let i = 0; i < report.length - 1; i++) {
		if (report[i] <= report[i + 1]) {
			return false;
		}
	}

	return true;
};

const isProperlySpaced = (report: number[]) => {
	for (let i = 0; i < report.length - 1; i++) {
		const magnitude = Math.abs(report[i] - report[i + 1]);
		if (magnitude < 1 || magnitude > 3) {
			return false;
		}
	}

	return true;
};

for (const report of reports) {
	if (
		(isIncreasing(report) || isDecreasing(report)) &&
		isProperlySpaced(report)
	) {
		numberOfSafeReports++;
	}
}

console.log(numberOfSafeReports);
