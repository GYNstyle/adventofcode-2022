const fs = require("node:fs");

function TreeNode(name, type, parent, size) {
  this.name = name || null;
  this.type = type || "dir";
  this.parent = parent || null;
  this.size = size || 0;
  this.children = {};
}

const root = new TreeNode("root", "dir", null);
let currentDir = root;

const commandLine = (input) => {
  const [_, command, dir] = input.split(" ");
  if (command === "ls") {
    return;
  }
  if (command === "cd") {
    if (dir === "..") {
      // go back to parent directory
      currentDir = currentDir.parent;
    } else if (dir === "/") {
      currentDir = root;
    } else {
      currentDir = currentDir.children[dir];
    }
  }
  return;
};

const contentLine = (line) => {
  const [dirOrSize, name] = line.split(" ");
  if (dirOrSize === "dir") {
    currentDir.children[name] = new TreeNode(name, "dir", currentDir);
  } else {
    currentDir.children[name] = new TreeNode(
      name,
      "file",
      currentDir,
      Number(dirOrSize)
    );
  }
};

const fileContent = fs.readFileSync("day7.txt", "utf-8");
fileContent.split(/r?\n/).forEach((line) => {
  if (line.startsWith("$")) {
    commandLine(line);
  } else {
    contentLine(line);
  }
});

const sumNodeSize = (node) => {
  if (node.type === "dir") {
    Object.keys(node.children).map((item) => {
      const nextNode = node.children[item];
      node.size += sumNodeSize(nextNode);
    });
  }
  return node.size;
};

const getTotalSizeUnderA = (node) => {
  let res = 0;
  if (node.type === "dir" && node.size < 100000) {
    res += node.size;
  }
  Object.keys(node.children).forEach((item) => {
    const nextNode = node.children[item];
    res += getTotalSizeUnderA(nextNode);
  });
  return res;
};

sumNodeSize(root);
const result = getTotalSizeUnderA(root);

const minSize = 30000000 - (70000000 - root.size);
const getSmallestDirToDelete = () => {
  let resultTwo = root.size;
  if (root.size < minSize) {
    return false;
  }
  const dfsFunc = (node) => {
    if (node.type === "dir" && node.size >= minSize) {
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

const resultTwo = getSmallestDirToDelete();

const solution = () => {
  return [result, resultTwo]
}

export default solution;

