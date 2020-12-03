const lineReader = require('line-reader');

const path = './input.txt';
let rows = [];

lineReader.eachLine(path, line => {
  rows = [...rows, line];
});

const createMap = () => {
  let map = [];

  for (let i = 0; i < rows.length; i++) {
    const cols = rows[i].split('');
    map = [...map, cols];
  }

  return map;
}

const getTreesCount = (map, right, down) => {
  let counter = 0, k = 0;

  for (let i = 0; i < map.length - down; i += down) {
    k += right;
    if (k >= 31) k %= 31;
    const nextPosition = map[i + down][k];
    if (nextPosition === '#') counter++;
  }

  return counter;
}

const main = () => {
  const map = createMap();

  const r1d1 = getTreesCount(map, 1, 1);
  const r3d1 = getTreesCount(map, 3, 1);
  const r5d1 = getTreesCount(map, 5, 1);
  const r7d1 = getTreesCount(map, 7, 1);
  const r1d2 = getTreesCount(map, 1, 2);

  const multiplication = r1d1 * r3d1 * r5d1 * r7d1 * r1d2;

  console.log(`Result: ${multiplication}`);
}

setTimeout(main, 1000);
