// Ref: https://adventofcode.com/2024/day/1
import {byLine} from '../util/byline.js'

const leftArr = [];
const rightArr = [];

byLine('input.txt', function(line) {
  // Parse the numbers
  const [left, right] = line.split('   ').map(n => Number(n));
  leftArr.push(left);
  rightArr.push(right);
})
.then(function () {
  leftArr.sort();
  rightArr.sort();
  
  let res = 0;
  for (let i = 0; i < leftArr.length; i++) {
    res += Math.abs(rightArr[i] - leftArr[i])
  }
  console.log(`Result is: ${res}`)
});
