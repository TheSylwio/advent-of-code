const lineReader = require('line-reader');

const path = './input.txt';
let lines = [];

lineReader.eachLine(path, line => {
  lines = [...lines, line];
});

const checkObjectsValidity = objects => {
  let counter = 0;

  for (let object of objects) {
    const isFirstLetterMatched = object.word[object.firstPosition - 1] === object.letterToCheck;
    const isSecondLetterMatched = object.word[object.secondPosition - 1] === object.letterToCheck;

    // XOR
    if ((isFirstLetterMatched && !isSecondLetterMatched) || (!isFirstLetterMatched && isSecondLetterMatched)) {
      counter++;
    }
  }

  return counter;
}

const createObject = line => {
  const positions = line.match(/\d\d?-\d\d?/g)[0];
  const firstPosition = positions.split('-')[0];
  const secondPosition = positions.split('-')[1];

  const letterToCheck = line.match(/[a-z]:/)[0].substring(0, 1);
  const word = line.match(/:\W\w+/g)[0].substring(2);


  return {firstPosition, secondPosition, letterToCheck, word};
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
  const validObjects = checkObjectsValidity(objects);

  console.log(`Result: ${validObjects}`);
}

setTimeout(main, 1000);