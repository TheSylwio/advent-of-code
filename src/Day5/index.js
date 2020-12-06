const lineReader = require('line-reader');

const path = './input.txt';
let lines = [];

lineReader.eachLine(path, line => {
  lines = [...lines, line];
});

const getId = (code, character, max) => {
  let lowerLimit = 0, upperLimit = max, diff = max / 2;

  for (let char of code) {
    char === character ? upperLimit -= diff : lowerLimit += diff;
    diff /= 2;
  }

  upperLimit -= 1;

  return code.substring(code.length - 1, code.length) === character ? lowerLimit : upperLimit;
}

const getRowId = code => getId(code, 'F', 128);

const getColumnId = code => getId(code, 'L', 8);

const createObject = line => {
  const rowId = getRowId(line.substring(0, 7));
  const columnId = getColumnId(line.substring(7, 10));

  return {
    row: rowId,
    column: columnId,
    seat: rowId * 8 + columnId
  };
}

const getObjects = () => {
  let objects = [];

  for (let line of lines) {
    objects = [...objects, createObject(line)];
  }

  return objects;
}

const main = () => {
  const objects = getObjects();

  const seats = [...objects.map(({seat}) => seat)];
  const maxSeatId = Math.max(...seats);

  for (let i = 38; i <= maxSeatId; i++) {
    if (!seats.includes(i)) {
      console.log(`Your seat ID: ${i}`);
    }
  }

  console.log(`The highest seat ID: ${maxSeatId}`);
}

setTimeout(main, 1000);