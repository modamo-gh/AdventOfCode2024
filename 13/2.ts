import { readFileSync } from "fs";

const clawMachineConfigurations = readFileSync("input.txt", "utf8")
    .trim()
    .split(/\n\n/);

type LocationData = { x: number | undefined; y: number | undefined };

const calculateNumberOfPresses = (
    aButton: LocationData,
    bButton: LocationData,
    prizeLocation: LocationData
) => {
    const numberOfPresses: { a: number | undefined; b: number | undefined } = {
        a: undefined,
        b: undefined
    };

    numberOfPresses.b =
        (aButton.y * prizeLocation.x - aButton.x * prizeLocation.y) /
        (aButton.y * bButton.x - aButton.x * bButton.y);

    numberOfPresses.a =
        (prizeLocation.x - bButton.x * numberOfPresses.b) / aButton.x;

    return numberOfPresses;
};

let fewestTotalTokens = 0;

for (const clawMachineConfiguration of clawMachineConfigurations) {
    const matches = [...clawMachineConfiguration.matchAll(/\d+/g)];

    const aButton: LocationData = {
        x: undefined,
        y: undefined
    };
    const bButton: LocationData = {
        x: undefined,
        y: undefined
    };
    const prizeLocation: LocationData = {
        x: undefined,
        y: undefined
    };

    [
        aButton.x,
        aButton.y,
        bButton.x,
        bButton.y,
        prizeLocation.x,
        prizeLocation.y
    ] = [
        matches[0][0],
        matches[1][0],
        matches[2][0],
        matches[3][0],
        matches[4][0],
        matches[5][0]
    ].map((value) => Number(value));

    prizeLocation.x += 10000000000000;
    prizeLocation.y += 10000000000000;

    console.log(prizeLocation);

    const numberOfPresses = calculateNumberOfPresses(
        aButton,
        bButton,
        prizeLocation
    );

    if (
        Number.isInteger(numberOfPresses.a) &&
        Number.isInteger(numberOfPresses.b)
    ) {
        const cost = 3 * numberOfPresses.a + numberOfPresses.b;

        fewestTotalTokens += cost;
    }
}

console.log(fewestTotalTokens);
