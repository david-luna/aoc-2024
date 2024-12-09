// Ref: https://adventofcode.com/2024/day/6
import {readFileSync} from 'fs';

const content = readFileSync('input.txt', {encoding: 'utf-8'});
const map = content.split('\n').map(l => l.split(''));
// Position & direction from the input file
const guard = {
  pos: { x: 69, y: 74 },
  dir: 'up',
};

// Visited places and counter, 1 also counts as visited
let visited = 1;

while(true) {
  // check stop conditions
  const {x,y} = guard.pos;
  if (x === 0 || x === map.length - 1) break;
  if (y === 0 || y === map[0].length - 1) break;

  // check for turns
  if (guard.dir === 'up' && map[x-1][y] === '#') {
    // console.log('obstacle going %s at[%d][%d]', guard.dir, x-1, y)
    guard.dir = 'right';
    continue;
  }
  if (guard.dir === 'right' && map[x][y+1] === '#') {
    // console.log('obstacle going %s at[%d][%d]', guard.dir, x, y+1)
    guard.dir = 'down';
    continue;
  }
  if (guard.dir === 'down' && map[x+1][y] === '#') {
    // console.log('obstacle going %s at[%d][%d]', guard.dir, x+1, y)
    guard.dir = 'left';
    continue;
  }
  if (guard.dir === 'left' && map[x][y-1] === '#') {
    // console.log('obstacle going %s at[%d][%d]', guard.dir, x, y-1)
    guard.dir = 'up';
    continue;
  }
  // Move in the given direction
  if (guard.dir === 'up') guard.pos.x--;
  if (guard.dir === 'down') guard.pos.x++;
  if (guard.dir === 'left') guard.pos.y--;
  if (guard.dir === 'right') guard.pos.y++;

  if (map[guard.pos.x][guard.pos.y] === '.') {
    visited++;
  }
  map[guard.pos.x][guard.pos.y] = 'X';
}


console.log('Guard is visiting %s different cells', visited);
