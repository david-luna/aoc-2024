// Ref: https://adventofcode.com/2024/day/3
import {byLine} from '../util/byline.js'

const pairs = [];
let doing = true;

byLine('input.txt', function(line) {
  const matches = line.match(/(mul\(\d+,\d+\))|(do\(\))|(don't\(\))/g);

  for(const m of matches) {
    if (m === 'do()') {
      doing = true;
      continue;
    } else if (m === "don't()") {
      doing = false;
      continue;
    }

    if (doing) {
      const nums = m.substring(4, m.length - 1);
      pairs.push(nums.split(',').map(n => Number(n)));
    }
    
  }
})
.then(function () {
  const result = pairs.reduce((acc, p) => acc + (p[0] * p[1]), 0)
  console.log(`Multiplications (part1): ${result}`);
});
