import readTxt from "../utils/readTxt.js";

const calorieCounting = () => {
  const data = readTxt(1);

  const sumData = data.split("\n\n").map((item) => {
    const sum = item
      .split("\n")
      .reduce((acc, curr) => Number(acc) + Number(curr), 0);
    return sum;
  });

  const solutionOne = () => {
    let res = 0;
    sumData.forEach((sum) => {
      res = Math.max(res, sum);
    });
    return res;
  };

  const solutionTwo = () => {
    let [min, middle, max] = [0, 0, 0];
    sumData.forEach((sum) => {
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
    return min + middle + max;
  };

  return [solutionOne(), solutionTwo()];
};

console.log(calorieCounting());
