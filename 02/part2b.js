// Ref: https://adventofcode.com/2024/day/1
import {byLine} from '../util/byline.js'

function badLevel(type, report) {
  for (let i = 0; i < report.length - 1; i++) {
    const diff = report[i+1] - report[i];
    if (type === 'A' && (diff < 1 || diff > 3)) {
      return i;
    }
    if (type === 'D' && (diff > -1 || diff < -3)){
      return i;
    }
  }
  return undefined;
}

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
  const level = badLevel(type, report)

  if(level) {
    const try1 = badLevel(type, report.toSpliced(level, 1));
    const try2 = badLevel(type, report.toSpliced(level + 1, 1));

    if (typeof try1 === 'undefined' || typeof try2 === 'undefined') {
      safeReports +=1;
      console.log(type, report.join(', '), typeof try1 === 'undefined' ? level : level + 1, try1)
    }
  } else {
    safeReports +=1;
  }
  
})
.then(function () {
  console.log(`Num of safe reports (part2): ${safeReports}`);
});
