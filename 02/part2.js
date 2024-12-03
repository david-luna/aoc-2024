// Ref: https://adventofcode.com/2024/day/1
import {byLine} from '../util/byline.js'

let safeReports = 0;

byLine('input.txt', function(line) {
  // Parse the numbers
  const report = line.split(' ').map(n => Number(n));
  
  let index = 0;
  let type; // ascending(A) | descending(D)

  while(index < report.length - 1) {
    const curr = report[index];
    const next = report[index + 1];
    const diff = next - curr;

    if (!type && diff > 0) type = 'A';
    if (!type && diff < 0) type = 'D';

    if (!type) {
      // In the beginnig, just skip this one
      if (index === 0) {
        index++;
        continue;
      }
      return;
    }

    // There might be nuber that change the type of report
    // ex: 10 12 8 6
    if (type === 'A' && (diff < 1 || diff > 3)) return;
    if (type === 'D' && (diff < -3 || diff > -1)) return;
    index++;
  }

  safeReports++;
})
.then(function () {
  console.log(`Num of safe reports (part2): ${safeReports}`);
});
