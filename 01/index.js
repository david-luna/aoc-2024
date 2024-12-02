// Ref: https://adventofcode.com/2024/day/1
import {byLine} from '../util/byline.js'

let sumLeft = 0, sumRight = 0;

byLine('input.txt', function(line) {
  // Parse the numbers
  const [left, right] = line.split('   ').map(n => Number(n));
  // Sum all numbers
  sumLeft += left;
  sumRight += right;
})
.then(function () {
  // The sum of diffs is the diff of the sum
  console.log(`Result is: ${sumRight - sumLeft}`)
});
