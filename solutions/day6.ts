import readTxt from '../utils/readTxt';

const solutions = () => {
    const data = readTxt(6);

    const solution = [];
    let prefix = '';
    for (let i = 0; i < data.length; i++) {
        // solution one
        if (prefix.length === 4 && solution.length === 0) {
            solution.push(i);
        }
        // solution two
        if (prefix.length === 14) {
            solution.push(i);
            return solution;
        }
        const idx = prefix.indexOf(data[i]);
        if (idx >= 0) {
            prefix = prefix.substring(idx + 1);
        }
        prefix += data[i];
    }
};

export default solutions;
