import { readFileSync } from "node:fs";
const calorieCounting = () => {
  // Read input
  const data = readFileSync("./inputs/1.txt", "utf-8");

  let res = 0;
  data.split("\n\n").forEach((item) => {
    const sum = item
      .split("\n")
      .reduce((acc, curr) => Number(acc) + Number(curr), 0);
    res = Math.max(res, sum);
  });

  return res;
};
// console.log(calorieCounting());

const calorieCountingTwo = () => {
  // Read input
  const data = readFileSync("./inputs/1.txt", "utf-8");

  let [max, min, middle] = [0, 0, 0];

  data.split("\n\n").forEach((item) => {
    const sum = item
      .split("\n")
      .reduce((acc, curr) => Number(acc) + Number(curr), 0);
    if (sum > min) {
      if (sum >= max) {
        min = middle;
        middle = max;
        max = sum;
      } else if (sum >= middle) {
        min = middle;
        middle = sum;
      } else {
        min = sum;
      }
    }
  });

  return max + min + middle;
};
console.log(calorieCountingTwo());
