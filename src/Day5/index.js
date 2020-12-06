const lineReader = require('line-reader');

const path = './input.txt';
let lines = [];

lineReader.eachLine(path, line => {
  lines = [...lines, line];
});

const getRowId = code => {
  let lowerLimit = 0, upperLimit = 128, diff = 64;

  for (let char of code) {
    char === 'F' ? upperLimit -= diff : lowerLimit += diff;
    diff /= 2;
  }

  upperLimit -= 1;

  return code.substring(6, 7) === 'F' ? lowerLimit : upperLimit;
}

const getColumnId = code => {
  let lowerLimit = 0, upperLimit = 8, diff = 4;

  for (let char of code) {
    char === 'L' ? upperLimit -= diff : lowerLimit += diff;
    diff /= 2;
  }

  upperLimit -= 1;

  return code.substring(2, 3) === 'L' ? lowerLimit : upperLimit;
}

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