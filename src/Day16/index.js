const lineReader = require('line-reader');

const path = './input.txt';
let lines = [];

lineReader.eachLine(path, line => {
  lines = [...lines, line];
});

const createInstructionsObject = instructions => {
  let object = {};
  for (let instruction of instructions) {
    const parts = instruction.split(': ');

    const name = parts[0].replace(' ', '_');
    const ranges = parts[1].split(' or ').map(range => {
      const x = range.split('-');
      return [Number(x[0]), Number(x[1])];
    });

    object = { ...object, [name]: ranges };
  }

  return object;
};

const isValueInRange = (value, array) => value >= array[0] && value <= array[1];

const checkTicketErrorRate = (ticket, instructions) => {
  const ticketValues = ticket.split(',').map(value => Number(value));
  let errors = [];

  for (let ticketValue of ticketValues) {
    let rangesIncludesValue = [];
    for (let ranges of Object.values(instructions)) {
      const isInRange = isValueInRange(ticketValue, ranges[0]) || isValueInRange(ticketValue, ranges[1]);
      rangesIncludesValue = [...rangesIncludesValue, isInRange];
      if (isInRange) break;
    }

    if (!rangesIncludesValue.some(el => el)) {
      errors = [...errors, ticketValue];
    }
  }

  return errors.length > 0 ? errors.reduce((acc, curr) => acc + curr) : 0;
};

const checkGroupOfTickets = (tickets, instructions) => {
  let results = [];
  for (let ticket of tickets) {
    results = [...results, checkTicketErrorRate(ticket, instructions)];
  }

  return results.reduce((acc, curr) => acc + curr);
};

const removeInvalidTickets = (tickets, instructions) => {
  let copy = [...tickets];
  for (let [index, ticket] of copy.entries()) {
    const result = checkTicketErrorRate(ticket, instructions);
    if (result !== 0) {
      delete copy[index];
    }
  }

  return copy.filter(el => el !== null);
};

const createMatrix = length => Array(length).fill(0).map(() => Array(length).fill(0));

const searchMatrix = matrix => {
  let copy = matrix.map(arr => arr.slice(0));
  let transposedCopy = copy[0].map((_, colIndex) => copy.map(row => row[colIndex]));
  let searchedRowIndex = 0, searchedColumnIndex = 0;

  for (let row of copy) {
    const sum = row.reduce((prev, curr) => prev + curr);
    if (sum === 2) searchedRowIndex = sum;
  }

  for (let row of transposedCopy) {
    const sum = row.reduce((prev, curr) => prev + curr);
    if (sum === 0) searchedColumnIndex = sum;
  }

  console.log(searchedRowIndex, searchedColumnIndex);
};


const getFinalValue = (tickets, instructions) => {
  let matrix = createMatrix(tickets.length);
  const ranges = Object.values(instructions);

  // Fill matrix with invalid values counts
  for (let ticket of tickets) {
    const ticketValues = ticket.split(',').map(el => Number(el));

    for (let [ticketValueIndex, ticketValue] of ticketValues.entries()) {
      for (let [rangeIndex, range] of ranges.entries()) {
        if (!isValueInRange(ticketValue, range[0]) && !isValueInRange(ticketValue, range[1])) {
          matrix[rangeIndex][ticketValueIndex]++;
        }
      }
    }
  }

  searchMatrix(matrix);

  // console.log(matrix);
};


const main = () => {
  const instructions = lines.slice(0, 3); // 0 20 <=> 0 3
  const ticket = lines.slice(5, 6)[0]; // 22 23 <=> 5 6
  const nearbyTickets = lines.slice(8, lines.length); //25 LL <=> 8 LL

  const instructionsObject = createInstructionsObject(instructions);
  const ticketErrorRate = checkTicketErrorRate(ticket, instructionsObject);
  const nearbyTicketsErrorRate = checkGroupOfTickets(nearbyTickets, instructionsObject);

  const validTickets = removeInvalidTickets(nearbyTickets, instructionsObject);
  const finalValue = getFinalValue(validTickets, instructionsObject);
};

setTimeout(main, 1000);