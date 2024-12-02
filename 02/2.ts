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

const isSafe = (report: number[]) => {
	if (
		(isIncreasing(report) || isDecreasing(report)) &&
		isProperlySpaced(report)
	) {
		return true;
	}

	return false;
};

for (const report of reports) {
	if (isSafe(report)) {
		numberOfSafeReports++;
        continue;
	}

	for (let i = 0; i < report.length; i++) {
		const modifiedReport = [...report];
		modifiedReport.splice(i, 1);

		if (isSafe(modifiedReport)) {
			numberOfSafeReports++;
			break;
		}
	}
}

console.log(numberOfSafeReports);
