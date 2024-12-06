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

  for (let i = 1; i < nums.length; i++) {
    const rule = rules.get(nums[i]);
    if (!rule) continue;

    // return if one of the numbers before the current
    // has a rule saying it must go after
    for (let j = 0; j < i; j++) {
      if (rule.indexOf(nums[j]) !== -1) {
        // console.log(`(${lineNum}) breaking rule ${nums[i]}|${nums[j]}`);
        return;
      }
    }
  }

  // get the middle page
  let mid = Math.floor(nums.length / 2); // assuming length is odd
  
  // console.log(nums.join(','), ' // ', nums.length)
  result += nums[mid];
})
.then(function () {
  console.log(`Updates sum (part1): ${result}`);
});
