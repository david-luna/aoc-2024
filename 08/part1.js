// Ref: https://adventofcode.com/2024/day/8
import {byLine} from '../util/byline.js'

const antennas = new Map();
const gridSize = 50;
let rowIdx = 0;

byLine('input.txt', function(line) {
  for (let col = 0; col < line.length; col++) {
    if (line[col] !== '.') {
      const freq = line[col];
      const positions = antennas.get(freq) || [];
      positions.push([rowIdx, col]);
      antennas.set(freq, positions);
    }
  }
  rowIdx++;
})
.then(function () {
  const isInside = (x, y) => 0 <= x && x < gridSize && 0 <= y && y < gridSize;
  const antinodes = new Set();

  for(const [freq, positions] of antennas.entries()) {
    for (const pos1 of positions) {
      for (const pos2 of positions) {
        if (pos1 === pos2) continue;

        const [x1, y1] = pos1;
        const [x2, y2] = pos2;
        const [dx, dy] = [x2 - x1, y2 - y1];

        let [x, y] = [x1 - dx, y1 - dy];
        if (isInside(x,y)) {
          console.log(`freq(${freq}):`, pos1, '<-', pos2, x, y)
          antinodes.add(`${x},${y}`);
        }

        [x, y] = [x2 + dx, y2 + dy];
        if (isInside(x,y)) {
          console.log(`freq(${freq}):`, pos1, '->', pos2, x, y)
          antinodes.add(`${x},${y}`);
        }
      }
    }
  }

  console.log(`Total antinodes (part1): ${antinodes.size}`);
});
