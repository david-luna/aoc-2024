// Ref: https://adventofcode.com/2024/day/4
import {byLine} from '../util/byline.js'

const wordLen = 'MAS'.length;
const lineBuff = [];
let count = 0;

byLine('input.txt', function(line) {
  const charArr = line.split('');

  // Fill the buffer without having too many lines
  lineBuff.push(charArr);
  if (lineBuff.length > wordLen) {
    lineBuff.shift();
  }

  // If we have enough lines
  if (lineBuff.length === wordLen) {
    // check the middel line
    lineBuff[1].forEach((c, idx) => {
      if (c!== 'A') return;
      // get \ text
      const slash1 = lineBuff[0][idx-1] + c + lineBuff[2][idx+1];
      // get / text
      const slash2 = lineBuff[2][idx-1] + c + lineBuff[0][idx+1];

      if ((slash1 === 'MAS' || slash1 === 'SAM') && (slash2 === 'MAS' || slash2 === 'SAM')) {
        count++;
      }
    })
  }
})
.then(function () {
  console.log(`XMAS count (part1): ${count}`);
});
