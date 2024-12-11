// Ref: https://adventofcode.com/2024/day/9
import {byLine} from '../util/byline.js'

let checksum = 0;

byLine('input.txt', function(line) {
  let id = 0;
  let blocks = [];
  for (let i = 0; i < line.length; i++) {
    const num = Number(line[i]);

    if (i % 2 === 0) {
      blocks.push({
        type: 'file',
        id: id++,
        size: num,
      });
    } else if (num > 0) {
      blocks.push({
        type: 'space',
        size: num,
      });
    }
  }

  
    let i = blocks.length - 1;

  while (i > 0) {
    const b = blocks[i];
    if (b.type === 'space') {
      i--;
      continue;
    }
    let j = blocks.findIndex((b2) => b2.type === 'space' && b2.size >= b.size);
    if (j !== -1 && j < i) {
      const sblk = blocks[j];
      blocks[i] = { type: 'space', size: b.size }
      if (sblk.size === b.size) {
        blocks[j] = b;
      } else {
        sblk.size -= b.size;
        blocks.splice(j, 1, b, sblk);
      }
      i = blocks.length - 1;
      continue;
    }
    i--;
  }

  const nums = blocks.reduce((acc, b) => {
    const isSpace = b.type === 'space'
    acc.push(...new Array(b.size).fill(isSpace ? '.' : b.id));
    return acc;
  }, []);

  for (i = 0; i < nums.length; i++) {
    if (typeof nums[i] === 'number') {
      checksum += i * nums[i];
    }
  }

})
.then(function () {
  
  console.log(`Checksum (part1): ${checksum}`);
});
