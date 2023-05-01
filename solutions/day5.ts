import readByLine from '../utils/readTxtByLine';

const solutions = async () => {
    const lines = readByLine(5);
    const arr: Array<string> = new Array(9).fill('');
    for await (const line of lines) {
        // original stack
        if (line.trim().startsWith('[')) {
            const len = line.length;
            for (let i = 0; i < len; i += 4) {
                const word = line.substring(i, i + 4).trim();
                if (word) {
                    arr[i / 4] += word[1];
                }
            }
        }

        if (line.startsWith('move')) {
            let [, count, , from, , to] = line
                .split(' ')
                .filter((item) => item)
                .map((item) => Number(item));
            from -= 1;
            to -= 1;
            // solution one
            // for (let i = 0; i < count; i++) {
            //     if (arr[from]) {
            //         arr[to] = arr[from][0] + arr[to];
            //         arr[from] = arr[from].substring(1);
            //     }
            // }
            // solution two
            const str = arr[from].substring(0, count);
            arr[to] = str + arr[to];
            arr[from] = arr[from].substring(count);
        }
    }
    const result = arr
        .filter((item) => item)
        .map((item) => item[0])
        .join('');
    console.log(result);
    return result;
};

export default solutions;
