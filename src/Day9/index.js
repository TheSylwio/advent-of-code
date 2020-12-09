const lineReader = require('line-reader');

const path = './input.txt';
const preambleLength = 25;

let lines = [];

lineReader.eachLine(path, line => {
  lines = [...lines, Number(line)];
});

const checkPreviousValues = (element, index) => {
  const slicedArray = lines.slice(index - preambleLength, index);
  let matches = new Set();

  for (let el of slicedArray) {
    for (let el2 of slicedArray) {
      if (el === el2) continue;

      if (el + el2 === element) matches.add(el).add(el2);
    }
  }

  if (matches.size === 0) {
    return element;
  }
}

const searchContiguousRange = invalidNumber => {
  const invalidNumberIndex = lines.findIndex(el => el === invalidNumber);
  const range = lines.slice(0, invalidNumberIndex);

  let left = 0, right = 1;

  while (right !== range.length) {
    const elements = range.slice(left, left + right);
    const sum = elements.reduce((acc, prev) => acc + prev);

    if (sum === invalidNumber) {
      return elements;
    }

    if (sum > invalidNumber) {
      left++;
      right = 1;
    }

    right++;
  }
}

const getInvalidNumber = () => {
  for (let i = preambleLength; i < lines.length; i++) {
    const result = checkPreviousValues(lines[i], i);

    if (result) return result;
  }
}


const main = () => {
  const invalidNumber = getInvalidNumber();
  const contiguousRange = searchContiguousRange(invalidNumber);
  const sum = Math.max(...contiguousRange) + Math.min(...contiguousRange);

  console.log(`Invalid number in XMAS-encrypted list of numbers: ${invalidNumber}`);
  console.log(`Encryption weakness in XMAS-encrypted list of numbers: ${sum}`);
}

setTimeout(main, 1000);