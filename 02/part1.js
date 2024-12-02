// Ref: https://adventofcode.com/2024/day/1
import {byLine} from '../util/byline.js'

let safeReports = 0;

byLine('input.txt', function(line) {
  // Parse the numbers
  const report = line.split(' ').map(n => Number(n));
  
  // Check if ascending (A) or descending (D)
  let i = 0;
  let type;

  while(type === undefined && i < report.length - 1) {
    const diff = report[i+1] - report[i];
    if (diff > 0) type = 'A';
    if (diff < 0) type = 'D';
    i++;
  }
  
  // Now check for safety
  for (let i = 0; i < report.length - 1; i++) {
    const diff = report[i+1] - report[i];
    if (type === 'A' && (diff < 1 || diff > 3)) {
      return;
    }
    if (type === 'D' && (diff > -1 || diff < -3)){
      return;
    }
  }

  safeReports++;
})
.then(function () {
  console.log(`Num of safe reports (part1): ${safeReports}`);
});
