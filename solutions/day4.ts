import readByLine from '../utils/readTxtByLine';

const solutions = async () => {
    const lines = readByLine(4);

    // Solution One
    let resultOne = 0;
    const splitWithDash = (str: string) => {
        return str.split('-').map((item) => Number(item));
    };
    const aFullyContainB = (a: Array<number>, b: Array<number>) => {
        if (a[0] <= b[0] && a[1] >= b[1]) {
            return true;
        }
        return false;
    };
    // Solution Two
    let resultTwo = 0;
    const overlapFn = (a: Array<number>, b: Array<number>) => {
        if (a[0] < b[0] && a[1] < b[0]) {
            return false;
        }
        if (b[0] < a[0] && b[1] < a[0]) {
            return false;
        }
        return true;
    };
    for await (const line of lines) {
        const [sectionOne, sectionTwo] = line.split(',');
        const rangeOne = splitWithDash(sectionOne);
        const rangeTwo = splitWithDash(sectionTwo);
        if (aFullyContainB(rangeOne, rangeTwo)) {
            resultOne += 1;
        } else if (aFullyContainB(rangeTwo, rangeOne)) {
            resultOne += 1;
        }
        if (overlapFn(rangeTwo, rangeOne)) {
            resultTwo += 1;
        }
    }
    return [resultOne, resultTwo];
};

export default solutions;
