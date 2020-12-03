const lineReader = require('line-reader');

const path = './input.txt';
let lines = [];

lineReader.eachLine(path, line => {
  lines = [...lines, Number(line)];
});

const main = () => {
  const array = lines.sort((a, b) => a - b);
  const set = new Set();

  for (let x of array) {
    for (let y of array) {
      for (let z of array) {
        if (x + y + z === 2020) {
          set.add(x).add(y).add(z);
        }
      }
    }
  }

  const numbers = [...set];
  const result = numbers.reduce((acc, value) => acc * value);

  console.log(`Searched numbers: ${numbers}`);
  console.log(`Multiplication result: ${result}`);
}

setTimeout(main, 1000)