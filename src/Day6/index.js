const lineReader = require('line-reader');

const path = './input.txt';

let groups = [], groupLines = [];

lineReader.eachLine(path, line => {
  if (line !== '') {
    groupLines = [...groupLines, line];
  } else {
    groups = [...groups, groupLines];
    groupLines = [];
  }
});

const main = () => {
  let uniqueAnswersSum = 0, everyAnswerSum = 0;

  for (let group of groups) {
    let answers = [], checkedAnswers = [], countedAnswers = {};
    const uniqueAnswers = new Set();

    for (let person of group) {
      for (let char of person) {
        uniqueAnswers.add(char)
        answers = [...answers, char];
      }
    }

    for (let answer of answers) {
      if (!checkedAnswers.includes(answer)) {
        checkedAnswers = [...checkedAnswers, answer];
        countedAnswers = {
          ...countedAnswers,
          [answer]: 1
        }
      } else {
        countedAnswers[answer] = countedAnswers[answer] + 1;
      }
    }

    for (let cta of Object.keys(countedAnswers)) {
      if (countedAnswers[cta] === group.length) {
        everyAnswerSum += 1;
      }
    }

    uniqueAnswersSum += uniqueAnswers.size;
  }

  console.log(`Sum of unique answers: ${uniqueAnswersSum}`)
  console.log(`Sum of counts: ${everyAnswerSum}`)
}

setTimeout(main, 1000);