import { readFileSync } from "node:fs";

export default function(day) {
  return readFileSync(`./inputs/${day}.txt`, 'utf-8');
}
