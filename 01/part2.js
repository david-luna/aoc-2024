// Ref: https://adventofcode.com/2024/day/1
import {byLine} from '../util/byline.js'

const leftArr = [];
const rightMap = new Map();

byLine('input.txt', function(line) {
  // Parse the numbers
  const [left, right] = line.split('   ').map(n => Number(n));
  leftArr.push(left);

  const count = rightMap.get(right) || 0;
  rightMap.set(right, count + 1);
})
.then(function () {
  let res = 0;

  for (let i = 0; i < leftArr.length; i++) {
    const num = leftArr[i];
    const multiplier = rightMap.get(num) || 0;
    res += num * multiplier;
  }
  console.log(`Result is: ${res}`)
});
