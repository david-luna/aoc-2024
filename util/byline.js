import {createReadStream} from 'fs';
import {createInterface} from 'readline';


export async function byLine(path, fn) {
  const rl = createInterface({
    input: createReadStream(path),
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    // console.log(`Line from file: ${line}`);
    fn(line);
  }
}