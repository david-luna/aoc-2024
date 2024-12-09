// Ref: https://adventofcode.com/2024/day/6
import {readFileSync} from 'fs';

const content = readFileSync('test.txt', {encoding: 'utf-8'});
const map = content.split('\n').map(l => l.split(''));
// Position & direction from the input file
// const guard = {
//   pos: { x: 69, y: 74 },
//   dir: 'up',
// };
const guard = {
  pos: { x: 6, y: 4 },
  dir: 'up',
};
let obstructions = 0;


function canConnect(x, y, map, char) {
  // check if the guar already visited in that direction
  // and there is no obstacle already
  if (map[x][y] === char) {
    const nextX = char === '>' ? x - 1 : (char === '<' ? x + 1 : x);
    const nextY = char === '^' ? y - 1 : (char === 'v' ? y + 1 : y);
    const next = map[nextX][nextY];
    
    if (next !== '#') {
      // console.log('obstruction position [%d][%d]', nextX, nextY);
      return true;
    } 
  }

  let str = ''
  if (char === '^') {
    while (x > 0) str = str + map[x--][y];
  }
  if (char === 'v') {
    while (x < map.length) str = str + map[x++][y];
  }
  if (char === '>') {
    while (y < map[0].length) str = str + map[x][y++];
  }
  if (char === '<') {
    while (y < 0) str = str + map[x][y--];
  }
  const obsIdx = str.indexOf('#');
  const chrIdx = str.indexOf(char);

  // to connect we need
  // - to find a char in the direction we want
  // - no obstacles on thepat or after the char
  return (chrIdx !== -1 && (obsIdx === -1 || chrIdx < obsIdx));
}

// Follow the guard's path and check where we can make loops
while(true) {
  // check stop conditions
  const {x,y} = guard.pos;
  console.log('position (%d, %d)', x, y)
  console.log(map.map(l => l.join('')).join('\n'))
  if (x === 0 || x === map.length - 1) break;
  if (y === 0 || y === map[0].length - 1) break;

  // do movements and check for llops
  if (guard.dir === 'up') {
    // turn
    if (map[x-1][y] === '#') {
      console.log('obstacle going %s at[%d][%d]', guard.dir, x-1, y)
      guard.dir = 'right';
      map[x][y] = '>';
      continue;
    }
    if (canConnect(x-1, y, map, '>')) {
      console.log('possible obstruction at[%d][%d]', x-2, y)
      obstructions++;
    }
  }
  if (guard.dir === 'right') {
    // turn
    if ( map[x][y+1] === '#') {
      console.log('obstacle going %s at[%d][%d]', guard.dir, x, y+1)
      guard.dir = 'down';
      map[x][y] = 'v';
      continue;
    }
    if (canConnect(x, y+1, map, 'v')) {
      console.log('possible obstruction at[%d][%d]', x, y+2)
      obstructions++;
    }
  }
  if (guard.dir === 'down') {
    if (map[x+1][y] === '#') {
      console.log('obstacle going %s at[%d][%d]', guard.dir, x+1, y)
      guard.dir = 'left';
      map[x][y] = '<';
      continue;
    }
    if (canConnect(x+1, y, map, '<')) {
      console.log('possible obstruction at[%d][%d]', x+2, y)
      obstructions++;
    }
  }
  if (guard.dir === 'left') {
    if (map[x][y-1] === '#') {
      console.log('obstacle going %s at[%d][%d]', guard.dir, x, y-1)
      guard.dir = 'up';
      map[x][y] = '^';
      continue;
    }
    if (canConnect(x, y-1, map, '^')) {
      console.log('possible obstruction at[%d][%d]', x, y-2)
      obstructions++;
    }
  }
  // Move in the given direction
  if (guard.dir === 'up') {
    map[x][y] = '^';
    guard.pos.x--;
  }
  if (guard.dir === 'down') {
    map[x][y] = 'v';
    guard.pos.x++;
  }
  if (guard.dir === 'left') {
    map[x][y] = '<';
    guard.pos.y--;
  }
  if (guard.dir === 'right') {
    map[x][y] = '>';
    guard.pos.y++;
  }
}


console.log('There is %s possible obstructions', obstructions);
