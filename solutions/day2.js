import readTxt from '../utils/readTxt.js';

const shapScore = {
    rock: 1,
    paper: 2,
    scissors: 3,
};
const outcomeScore = {
    lose: 0,
    draw: 3,
    win: 6,
};

const playShapMap = {
    A: 'rock',
    B: 'paper',
    C: 'scissors',
    X: 'rock',
    Y: 'paper',
    Z: 'scissors',
};
const shapes = ['rock', 'paper', 'scissors'];
const groupScore = shapes.reduce((acc, curr, outIndex) => {
    shapes.forEach((item, innerIndex) => {
        const key = `${curr} ${item}`;
        let outcome = '';
        if (innerIndex === outIndex) {
            outcome = 'draw';
        } else if (innerIndex > outIndex) {
            outcome = innerIndex - outIndex == 2 ? 'lose' : 'win';
        } else {
            outcome = innerIndex === 0 && outIndex === 2 ? 'win' : 'lose';
        }
        const score = shapScore[item] + outcomeScore[outcome];
        acc[key] = score;
    });
    return acc;
}, {});

const playTwoOutcome = {
    X: 'lose',
    Y: 'draw',
    Z: 'win',
};
const playTwoShapeMap = {
    lose: {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper',
    },
    win: {
        rock: 'paper',
        paper: 'scissors',
        scissors: 'rock',
    },
    draw: {
        rock: 'rock',
        paper: 'paper',
        scissors: 'scissors',
    },
};

const rockPaperScissors = () => {
    const data = readTxt(2).split('\n');

    const totalScore = data.reduce((acc, item) => {
        const [playOne, playTwo] = item.split(' ');
        if (playOne) {
            const key = `${playShapMap[playOne]} ${playShapMap[playTwo]}`;
            acc += groupScore[key];
        }
        return acc;
    }, 0);

    const socre2 = data.reduce((acc, item) => {
        const [playOne, inputTow] = item.split(' ');
        if (playOne) {
            const playOneShape = playShapMap[playOne];
            const outcome = playTwoOutcome[inputTow];
            const playTwoShape = playTwoShapeMap[outcome][playOneShape];
            const key = `${playOneShape} ${playTwoShape}`;
            acc += groupScore[key];
        }
        return acc;
    }, 0);

    return [totalScore, socre2];
};

console.log(rockPaperScissors());
