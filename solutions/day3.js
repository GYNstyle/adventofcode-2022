import { default as fs } from 'node:fs';
import { default as readline } from 'node:readline';

const lowerP = new Array(26).fill(0).map((curr, index) => index + 1);
const upperP = new Array(26).fill(0).map((curr, index) => index + 27);
const lowerStartCode = 'a'.charCodeAt();
const upperStartCode = 'A'.charCodeAt();

const getP = (char) => {
    const code = char.charCodeAt();
    const isLow = code >= lowerStartCode;
    return isLow
        ? lowerP[code - lowerStartCode]
        : upperP[code - upperStartCode]; 
}
const rucksack = async () => {
    const fileStream = fs.createReadStream('./inputs/3.txt');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let sum = 0;
    let sumTwo = 0;
    let idx = 0;
    let [lineOne, lineTwo, lineThree] = ['', '', ''];
    for await (const line of rl) {
        const len = line.length;
        const first = new Set(line.substring(0, len / 2));
        const second = new Set(line.substring(len / 2));
        first.forEach((i) => {
            if (second.has(i)) {
                sum += getP(i)
            }
        });

        const lineSet = new Set(line);
        if (idx % 3 === 0) {
            lineOne = lineSet;
        } else if (idx % 3 === 1) {
            lineTwo = lineSet;
        } else {
            lineThree = lineSet;
            // common letter
            const commonSet = new Set()
            lineOne.forEach(item => {
                if (lineTwo.has(item)) {
                    commonSet.add(item)
                }
            })
            lineThree.forEach(item => {
                if (commonSet.has(item)) {
                    // find the common letter
                    sumTwo += getP(item)
                }
            })
        }
        idx += 1;
    }
    return [sum, sumTwo]
};

console.log(rucksack());
