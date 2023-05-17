import { readFileSync } from "node:fs";

const dirType = 'dir';
const fileType = 'file';

function TreeNode(name, type, parent, size) {
    this.name = name || null;
    this.type = type || dirType;
    this.parent = parent || null;
    this.size = size || 0;
    this.children = {};
}

const commandLine = (input, root, currentDir) => {
    const [_, command, dir] = input.split(' ');
    if (command === 'ls') {
        return currentDir;
    }
    if (command === 'cd') {
        if (dir === '..') {
            return currentDir.parent;
        }
        if (dir === '/') {
            return root;
        }
        return currentDir.children[dir];
    }
};

const contentLine = (line) => {
    const [dirOrSize, name] = line.split(' ');
    if (dirOrSize === dirType) {
        return {
            name,
            type: dirType,
            size: 0,
        };
    }
    return {
        name,
        type: fileType,
        size: Number(dirOrSize),
    };
};

const sumNodeSize = (node) => {
    if (node.type === dirType) {
        Object.keys(node.children).map((item) => {
            const nextNode = node.children[item];
            node.size += sumNodeSize(nextNode);
        });
    }
    return node.size;
};

const getTotalSizeUnderA = (node) => {
    let res = 0;
    if (node.type === dirType && node.size < 100000) {
        res += node.size;
    }
    Object.keys(node.children).forEach((item) => {
        const nextNode = node.children[item];
        res += getTotalSizeUnderA(nextNode);
    });
    return res;
};

const getSmallestDirToDelete = (root, minSize) => {
    let resultTwo = root.size;
    if (root.size < minSize) {
        return false;
    }
    const dfsFunc = (node) => {
        if (node.type === dirType && node.size >= minSize) {
            resultTwo = Math.min(resultTwo, node.size);
            Object.keys(node.children).forEach((item) => {
                const nextNode = node.children[item];
                dfsFunc(nextNode, resultTwo);
            });
        }
    };
    dfsFunc(root);
    return resultTwo;
};

const solution = () => {
    const root = new TreeNode('root', dirType, null);
    let currentDir = root;

    const fileContent = readFileSync('./inputs/7.txt', 'utf-8');
    fileContent.split(/r?\n/).forEach((line) => {
        if (line.startsWith('$')) {
            currentDir = commandLine(line, root, currentDir);
        } else {
            const obj = contentLine(line, currentDir);
            const { name, type, size } = obj;
            currentDir.children[name] = new TreeNode(
                name,
                type,
                currentDir,
                size
            );
        }
    });
    sumNodeSize(root);

    const solutionOne = getTotalSizeUnderA(root);
    const minSize = 30000000 - (70000000 - root.size);
    const solutionTwo = getSmallestDirToDelete(root, minSize);

    return [solutionOne, solutionTwo];
};

solution();
