const lineReader = require('line-reader');

const path = './input.txt';
let lines = [];

lineReader.eachLine(path, line => {
  lines = [...lines, line];
});

const getCommands = () => {
  let commands = [];

  for (let line of lines) {
    const values = line.split(' ');
    const command = values[0];
    const number = Number(values[1]);

    commands = [...commands, [command, number]];
  }

  return commands;
}

const terminateProgram = commands => {
  let acc = 0, i = 0, checkedIndexes = [];

  while (true) {
    const command = commands[i];

    if (checkedIndexes.includes(i) || !command) break;

    const commandName = command[0];
    checkedIndexes = [...checkedIndexes, i];

    switch (commandName) {
      case 'acc':
        acc += command[1];
        i++;
        break;
      case 'jmp':
        i += command[1];
        break;
      case 'nop':
        i++;
        break;
    }
  }

  return [i, acc];
}

const searchIndexes = (commands, basicValue, valueToChange) => {
  const indexes = commands.filter(el => el[0] === basicValue).map(el => commands.findIndex(x => x === el));

  for (let index of indexes) {
    const modifiedCommands = commands.map((el, i) => i === index ? [valueToChange, el[1]] : el);
    const [i, acc] = terminateProgram(modifiedCommands);

    if (i === commands.length) {
      console.log(`Changed command: ${basicValue} -> ${valueToChange}. Executed program with the value of accumulator: ${acc}`);
    }
  }
}

const main = () => {
  const commands = getCommands();

  searchIndexes(commands, 'jmp', 'nop');
  searchIndexes(commands, 'nop', 'jmp');
};

setTimeout(main, 1000);