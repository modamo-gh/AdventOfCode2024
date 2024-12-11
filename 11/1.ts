import { readFileSync } from "fs";

const stones = readFileSync("input.txt", "utf8")
	.trim()
	.split(/\s+/)
	.map(Number);

const getNumberOfDigits = (stoneValue: number) => {
	if (stoneValue === 0) {
		return 1;
	}

	let numberOfDigits = 0;

	while (stoneValue > 0) {
		stoneValue = Math.floor(stoneValue / 10);
		numberOfDigits++;
	}

	return numberOfDigits;
};

const NUMBER_OF_BLINKS = 25;

for (let blinks = 0; blinks < NUMBER_OF_BLINKS; blinks++) {
	for (let i = stones.length - 1; i >= 0; i--) {
		const currentStone = stones[i];
		const numberOfDigits = getNumberOfDigits(currentStone);

		if (currentStone === 0) {
			stones[i] = 1;
		} else if (numberOfDigits % 2 === 0) {
			const left = Math.floor(
				currentStone / Math.pow(10, numberOfDigits / 2)
			);
			const right = currentStone % Math.pow(10, numberOfDigits / 2);

            stones[i] = left;
            stones.splice(i + 1, 0, right)
		}
        else{ 
            stones[i] *= 2024
        }
	}
}

console.log(stones.length)