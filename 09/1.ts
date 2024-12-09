import { readFileSync } from "fs";

const diskMap = readFileSync("input.txt", "utf8").trim();

const decompress = (diskMap: string) => {
	let decompressed: string[] = [];

	for (let i = 0; i < diskMap.length; i++) {
		const character = i % 2 === 0 ? Math.floor(i / 2).toString() : ".";
		const repetitions = parseInt(diskMap[i]);

		for (let r = 0; r < repetitions; r++) {
			decompressed.push(character);
		}
	}

	return decompressed;
};

let decompressed = decompress(diskMap);

const isSorted = (decompressed: string[]) => {
	for (let i = 0; i < decompressed.length - 1; i++) {
		if (decompressed[i] === "." && decompressed[i + 1] !== ".") {
			return false;
		}
	}

	return true;
};

const moveFiles = (decompressed: string[]) => {
	while (!isSorted(decompressed)) {
		const dotIndex = decompressed.indexOf(".");
		let lastFileIndex = decompressed.length - 1;

		for (let i = lastFileIndex; i >= 0; i--) {
			if (decompressed[i] !== ".") {
				lastFileIndex = i;
				break;
			}
		}

		[decompressed[dotIndex], decompressed[lastFileIndex]] = [
			decompressed[lastFileIndex],
			decompressed[dotIndex]
		];
	}

	return decompressed;
};

const movedFiles = moveFiles(decompressed);

const calculateCheckSum = (movedFiles: string[]) => {
	let checkSum = 0;

	for (let i = 0; i < movedFiles.length; i++) {
		if (movedFiles[i] === ".") {
			break;
		}

		checkSum += i * parseInt(movedFiles[i]);
	}

	return checkSum;
};

const checkSum = calculateCheckSum(movedFiles);

console.log(checkSum);
