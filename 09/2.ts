import { readFileSync } from "fs";

const diskMap = readFileSync("input.txt", "utf8").trim();

const decompress = (diskMap: string) => {
	const decompressed = [];

	for (let i = 0; i < diskMap.length; i++) {
		const character = i % 2 === 0 ? (i / 2).toString() : ".";

		decompressed.push({
			character,
			length: parseInt(diskMap[i])
		});
	}

	return decompressed;
};

const decompressed = decompress(diskMap);

const findSpace = (i: number) => {
	let leftPointer = 1;
	let rightPointer = i;

	while (leftPointer < rightPointer) {
		if (
			decompressed[rightPointer].length >
				decompressed[leftPointer].length ||
			decompressed[leftPointer].character !== "."
		) {
			leftPointer++;
		} else {
			decompressed[leftPointer].length -=
				decompressed[rightPointer].length;
			decompressed.splice(leftPointer, 0, {
				...decompressed[rightPointer]
			});
			decompressed[rightPointer + 1].character = ".";
			break;
		}
	}
};

for (let i = decompressed.length - 1; i >= 0; i--) {
	if (decompressed[i].character !== ".") {
		findSpace(i);
	}
}

const calculateCheckSum = (files: { character: string; length: number }[]) => {
	let checkSum = 0;
	let internalIndex = 0;

	for (let i = 0; i < files.length; i++) {
		if (files[i].character !== ".") {
			checkSum +=
				parseInt(files[i].character) *
				(internalIndex + internalIndex + files[i].length - 1) *
				(files[i].length / 2);

			console.log(checkSum);
		}

		internalIndex += files[i].length;
	}

	return checkSum;
};

const checkSum = calculateCheckSum(decompressed);
