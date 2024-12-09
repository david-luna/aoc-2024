// Ref: https://adventofcode.com/2024/day/8
import {byLine} from '../util/byline.js'


const antennas = new Map();
let row = 0;
let count = 0;
byLine('example.txt', function(line) {
  
  for (let col = 0; col < line.length; col++) {
    if (line[col] !== '.') {
      const freq = line[col];
      const positions = antennas.get(freq) || [];
      positions.push([row, col]);
      antennas.set(freq, positions);
    }
  }
  row++;
})
.then(function () {
  // console.log(antennas)
  const antinodes = new Set();

  for(const [freq, positions] of antennas.entries()) {
    
  }
  console.log(`Total antinodes (part1): ${count}`);
});
