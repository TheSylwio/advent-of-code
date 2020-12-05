const lineReader = require('line-reader');

const path = './input.txt';

let objects = [], objectLines = [];

lineReader.eachLine(path, line => {
  if (line !== '') {
    objectLines = [...objectLines, line];
  } else {
    objects = [...objects, objectLines];
    objectLines = [];
  }
});

const createObject = string => {
  const birthYear = string.match(/byr:(19[2-8][0-9]|199[0-9]|200[0-2])/);
  const issueYear = string.match(/iyr:(201[0-9]|2020)/);
  const expirationYear = string.match(/eyr:(202[0-9]|2030)/);
  const height = string.match(/hgt:((1[5-8][0-9]|19[0-3])cm|(59|6[0-9]|7[0-6])in)/);
  const hairColor = string.match(/hcl:#([0-9]|[a-f]){6}/);
  const eyeColor = string.match(/ecl:(amb|blu|brn|gry|grn|hzl|oth)/);
  const passportId = string.match(/pid:\d{9}\b/);
  const countryId = string.match(/cid:\S{1,6}/);

  return {
    birthYear: birthYear ? Number(birthYear[0].split(':')[1]) : null,
    issueYear: issueYear ? Number(issueYear[0].split(':')[1]) : null,
    expirationYear: expirationYear ? Number(expirationYear[0].split(':')[1]) : null,
    height: height ? height[0].split(':')[1] : null,
    hairColor: hairColor ? hairColor[0].split(':')[1] : null,
    eyeColor: eyeColor ? eyeColor[0].split(':')[1] : null,
    passportId: passportId ? passportId[0].split(':')[1] : null,
    countryId: countryId ? countryId[0].split(':')[1] : null,
  };
}

const isValidObject = ({birthYear, issueYear, expirationYear, height, hairColor, eyeColor, passportId}) => {
  return !(!birthYear || !issueYear || !expirationYear || !height || !hairColor || !eyeColor || !passportId);
}

const countValidation = objects => {
  let counter = 0;

  for (let obj of objects) {
    if (isValidObject(obj)) counter++;
  }

  return counter;
}

const main = () => {
  let transformedObjects = [];

  for (let obj of objects) {
    const string = obj.join(' ');
    transformedObjects = [...transformedObjects, createObject(string)]
  }

  console.log(`Valid passports: ${countValidation(transformedObjects)}`);
}

setTimeout(main, 1000);