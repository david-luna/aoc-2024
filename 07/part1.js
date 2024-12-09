// Ref: https://adventofcode.com/2024/day/7
import {byLine} from '../util/byline.js'


function calc(nums, bits) {
  let res = nums[0];
  for (let i = 0; i < bits.length; i++) {
    if (bits[i] === '0') {
      res = res + nums[i+1];
    } else {
      res = res * nums[i+1];
    }
  }
  return res;
}


let sum = 0;

byLine('input.txt', function(line) {
  // Parse the numbers
  const parts = line.split(' ');
  const target = Number(parts.shift().slice(0, -1));
  const nums = parts.map(p => Number(p));
  const permutations = Math.pow(2, nums.length - 1);
  
  // console.log('nums', nums)
  let i = 0;
  while (i < permutations) {
    const bits = i.toString(2).padStart(nums.length - 1, '0').split('');
    const res = calc(nums, bits)
    // console.log('bits', bits)
    // console.log('calc', );
    if (res === target) {
      sum = sum + res;
      return;
    }
    i++;
  }
})
.then(function () {
  console.log(`Sum (part1): ${sum}`);
});
