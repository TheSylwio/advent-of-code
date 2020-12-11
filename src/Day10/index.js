// TODO: Do part 2
const lineReader = require('line-reader');

const path = './input.txt';

let lines = [];

lineReader.eachLine(path, line => {
  lines = [...lines, Number(line)];
});

const getMultipliedHops = adapters => {
  let oneHops = 0, threeHops = 0;

  adapters.reduce((acc, next) => {
    const diff = next - acc;

    if (diff === 1) oneHops++;
    if (diff === 3) threeHops++;

    return next;
  });

  return oneHops * threeHops;
};

const main = () => {
  const sortedAdapters = [0, ...lines, Math.max(...lines) + 3].sort((a, b) => a - b);
  const multipliedHops = getMultipliedHops(sortedAdapters);

  console.log(`Result: ${multipliedHops}`);
};

setTimeout(main, 1000);