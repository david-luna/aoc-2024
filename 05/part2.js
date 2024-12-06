// Ref: https://adventofcode.com/2024/day/5
import {byLine} from '../util/byline.js'

const rules = new Map();
let result = 0;
let lineNum = 0;
byLine('input.txt', function(line) {
  lineNum++;

  if (line === '') return;

  const isRule = /^\d+\|\d+$/.test(line);
  if (isRule) {
    const [prev, next] = line.split('|').map(n => Number(n));
    const arr = rules.has(prev) ? rules.get(prev) : [];
    arr.push(next);
    rules.set(prev, arr);
    return;
  }

  const nums = line.split(',').map(n => Number(n));
  const arr = [nums[0]];

  for (let i = 1; i < nums.length; i++) {
    const newNum = nums[i];
    const rule = rules.get(newNum)
    let idx, currNum;
    for (let j = 0; j < arr.length; j++) {
      currNum = arr[j];
      if (rule && rule.indexOf(currNum) !== -1) {
        idx = j;
        break;
      }
    }
    if (typeof idx === 'number') {
      arr.splice(idx, 1, newNum, currNum);
    } else {
      arr.push(newNum)
    }
  }

  // get the middle page
  let mid = Math.floor(arr.length / 2); // assuming length is odd
  console.log(arr.join(','), ' // ', nums.length)
  result += arr[mid];
})
.then(function () {
  console.log(`Updates sum (part2): ${result}`);
});
