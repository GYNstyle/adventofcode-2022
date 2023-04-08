// type InputFileType = any;
import * as dotenv from "dotenv";
import { writeFileSync } from "node:fs";

dotenv.config();

const headers = {
  headers: {
    cookie: process.env.COOKIE,
  },
};

/**
 * Get each day's input
 */
const inputPromises = new Array(25).fill(0).forEach(async (_, index) => {
  const day = index + 1;
  await fetch(`https://adventofcode.com/2022/day/${day}/input`, headers)
    .then((res) => res.text())
    .then((data) =>
      writeFileSync(`./inputs/${day}.txt`, data, {
        flag: "w+",
      })
    )
    .catch((e) => {
      console.log("-----------------------------");
      console.log(day, e.message, e.cause.code);
    });
});
