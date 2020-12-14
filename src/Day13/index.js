const lineReader = require('line-reader');

const path = './input.txt';
let lines = [];

lineReader.eachLine(path, line => {
  lines = [...lines, line];
});

const getBuses = string =>
  string.split(',')
    .map(el => Number(el))
    .filter(el => !isNaN(el))
    .sort((a, b) => a - b);

const getResults = (timeout, buses) => {
  let results = [];

  for (let id of buses) {
    const diff = id - (timeout % id);
    results = [...results, { id, diff }];
  }

  return results;
};

const main = () => {
  const timeout = Number(lines[0]);
  const buses = getBuses(lines[1]);
  const results = getResults(timeout, buses);

  const bus = results.reduce((prev, curr) => prev.diff < curr.diff ? prev : curr);

  console.log(`You need to wait ${bus.diff} minutes for Bus ${bus.id}. Result: ${bus.id * bus.diff}`);
};

setTimeout(main, 1000);