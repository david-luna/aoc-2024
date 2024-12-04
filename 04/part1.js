// Ref: https://adventofcode.com/2024/day/4
import {byLine} from '../util/byline.js'

const wordLen = 'XMAS'.length;
const lineBuff = [];
let count = 0;

byLine('input.txt', function(line) {
  const charArr = line.split('');
  
  // count XMAS and SAMX for the current line
  charArr.forEach((c, idx, arr) => {
    if (c === 'X' && arr[idx+1] === 'M' && arr[idx+2] === 'A' && arr[idx+3] === 'S') {
      count++;
    }
    if (arr[idx-3] === 'S' && arr[idx-2] === 'A' && arr[idx-1] === 'M' && c === 'X') {
      count++;
    }
  });

  // Fill the buffer without having too many lines
  lineBuff.push(charArr);
  if (lineBuff.length > wordLen) {
    lineBuff.shift();
  }

  // If we have enough lines
  if (lineBuff.length === wordLen) {
    // Top line 
    lineBuff[0].forEach((c, idx) => {
      // diagonal right-bottom
      if (c === 'X' && lineBuff[1][idx+1] === 'M' && lineBuff[2][idx+2] === 'A' && lineBuff[3][idx+3] === 'S') {
        count++;
      }
      // diagonal left-bottom
      if (lineBuff[3][idx-3] === 'S' && lineBuff[2][idx-2] === 'A' && lineBuff[1][idx-1] === 'M' && c === 'X') {
        count++;
      }
      // vertical
      if (c === 'X' && lineBuff[1][idx] === 'M' && lineBuff[2][idx] === 'A' && lineBuff[3][idx] === 'S') {
        count++;
      }
    })

    // Bottom line 
    lineBuff[3].forEach((c, idx) => {
      // diagonal right-up
      if (c === 'X' && lineBuff[2][idx+1] === 'M' && lineBuff[1][idx+2] === 'A' && lineBuff[0][idx+3] === 'S') {
        count++;
      }
      // diagonal left-up
      if (lineBuff[0][idx-3] === 'S' && lineBuff[1][idx-2] === 'A' && lineBuff[2][idx-1] === 'M' && c === 'X') {
        count++;
      }
      // vertical
      if (c === 'X' && lineBuff[2][idx] === 'M' && lineBuff[1][idx] === 'A' && lineBuff[0][idx] === 'S') {
        count++;
      }
    })

  }
})
.then(function () {
  console.log(`XMAS count (part1): ${count}`);
});
