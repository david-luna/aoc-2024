// Ref: https://adventofcode.com/2024/day/9
import {byLine} from '../util/byline.js'

let checksum = 0;

byLine('input.txt', function(line) {
  let id = 0;
  let blocks = [];
  for (let i = 0; i < line.length; i++) {
    const num = Number(line[i]);
    const char = i % 2 === 0 ? id : '.' ;
    blocks.push(...new Array(num).fill(char));
    if (i % 2 === 0) id++;
  }

  let i = 0, j = blocks.length - 1;

  while(i < j) {
    if (blocks[i] !== '.') {
      i++;
      continue;
    }
    if (blocks[j] === '.') {
      j--;
      continue;
    }
    blocks[i] = blocks[j];
    blocks[j] = '.';
    i++;
    j--;
    // console.log(blocks.join(''));
  }

  for (i = 0; i < blocks.length; i++) {
    if (typeof blocks[i] === 'number') {
      checksum += i * blocks[i];
    }
  }
})
.then(function () {
  
  console.log(`Checksum (part1): ${checksum}`);
});
