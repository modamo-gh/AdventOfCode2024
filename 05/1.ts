import { readFileSync } from "fs";

let rules: string | string[];
let updates: string | string[];

[rules, updates] = readFileSync("input.txt", "utf8")
	.trim()
	.split(/\n\n/)
	.map((x) => x.trim().split(/\n/));

const orderingMap = new Map<number, Set<number>>();

for (const rule of rules) {
	const [page, followingPage] = rule.split(/\|/).map(Number);
	const followingPages = orderingMap.get(page) || new Set<number>();

	followingPages.add(followingPage);
	orderingMap.set(page, followingPages);
}

const isValidUpdate = (pages: number[]) => {
	if (!pages.length) {
		return true;
	}

	let validFollowingPages = orderingMap.get(pages[0]);

	for (let i = 1; i < pages.length; i++) {
		if (!validFollowingPages) {
			return false;
		}

		if (validFollowingPages.has(pages[i])) {
			validFollowingPages = orderingMap.get(pages[i]);
		} else {
			return false;
		}
	}

	return true;
};

let sumOfMiddleNumbers = 0;

for (const update of updates) {
	const pages = update.trim().split(/,/).map(Number);

	if (isValidUpdate(pages)) {
		const middle = Math.floor(pages.length / 2);

		sumOfMiddleNumbers += pages[middle];
	}
}

console.log(sumOfMiddleNumbers);
