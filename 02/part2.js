// Ref: https://adventofcode.com/2024/day/1
import {byLine} from '../util/byline.js'

let safeReports = 0;

byLine('input.txt', function(line) {
  // Parse the numbers
  const report = line.split(' ').map(n => Number(n));
  
  // Check if ascending (A) or descending (D)
  // const type = report[1] - report[0] > 0 ? 'A' : 'D';
  // Check if ascending (A) or descending (D)
  let i = 0;
  let type;

  while(type === undefined && i < report.length - 1) {
    const diff = report[i+1] - report[i];
    if (diff > 0) type = 'A';
    if (diff < 0) type = 'D';
    i++;
  }
  let badLevel;
  
  console.log(type, report)
  for (let i = 0; i < report.length - 1; i++) {
    let diff = report[i+1] - report[i];

    if (type === 'A' && (diff < 1 || diff > 3)) {
      if (badLevel) return;
      if (i+2 === report.length) break;
      badLevel = i;
      console.log('bad level', badLevel)
      diff = report[i+2] - report[i];
      console.log('new diff', diff)
      if (diff < 1 || diff > 3) return;
      i++;
    }
    if (type === 'D' && (diff > -1 || diff < -3)){
      if (badLevel) return;
      if (i+2 === report.length) break;
      badLevel = i;
      console.log('bad level', badLevel)
      diff = report[i+2] - report[i];
      console.log('new diff', diff)
      if (diff > -1 || diff < -3) return;
      i++;
    }
  }
  
  console.log('safe')
  safeReports++;
})
.then(function () {
  console.log(`Num of safe reports (part2): ${safeReports}`);
});
