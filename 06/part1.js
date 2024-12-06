// Ref: https://adventofcode.com/2024/day/6
import {readFileSync} from 'fs';

const content = readFileSync('input.txt', {encoding: 'utf-8'});
const map = content.split('\n').map(l => l.split(''));
const obstaclePos = [];
const guard = {
  pos: [],
  dir: undefined,
};

// fill the positions
for (let i = 0; i < map.length; i++) {
  const row = map[i];
  for (let j = 0; j < row.length; j++) {
    const cell = row[j];
    if (cell === '#') {
      obstaclePos.push([i,j]);
    } else if (/[<>^v]/.test(cell)) {
      guard.pos = [i,j];
      guard.dir = cell === '<' ? 'left' :
        cell === '>' ? 'right' :
        cell === '^' ? 'up' : 'down';
    }
  }
}

function guardIterator(guard, obstaclePos) {
  const pos = [...guard.pos];
  const maxX = obstaclePos.length - 1;
  const maxY = obstaclePos[0].length - 1;

  const iter = {
    next () {
      // get new pos

      // if reached the exit stop
      if (
        (pos[0] === 0 || pos[0] === maxX) &&
        (pos[1] === 1 || pos[1] === maxY)
      ) {
        return { pos, done: true };
      }
    }
  };

  return iter;
}

console.log('guard', guard)
