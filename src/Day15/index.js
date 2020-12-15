const lineReader = require('line-reader');

const path = './input.txt';
let lines = [];

lineReader.eachLine(path, line => {
  lines = [...lines, line];
});

const main = () => {
  let numbers = lines[0].split(',').map(el => Number(el));

  for (let i = numbers.length; i < 2020; i++) {
    const consideredNumber = numbers[numbers.length - 1];
    const occurrences = numbers.filter(el => el === consideredNumber).length;

    if (occurrences === 1) {
      numbers.push(0);
    } else {
      const lastPosition = numbers.lastIndexOf(consideredNumber);
      const nextLastPosition = [...numbers].slice(0, lastPosition).lastIndexOf(consideredNumber);

      numbers.push(lastPosition - nextLastPosition);
    }
  }
  console.log(numbers[numbers.length - 1]);
};

setTimeout(main, 1000);