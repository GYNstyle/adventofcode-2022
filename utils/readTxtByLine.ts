import { default as fs, read } from 'node:fs';
import { default as readline } from 'node:readline';

const readByLine = (day: number) => {
    const fsStream = fs.createReadStream(`./inputs/${day}.txt`);
    const lines = readline.createInterface({
        input: fsStream,
        crlfDelay: Infinity,
    })
    return lines;
}

export default readByLine;