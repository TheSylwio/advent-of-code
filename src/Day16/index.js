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


const main = () => {
  const instructions = lines.slice(0, 3); // 0 20 <=> 0 3
  const ticket = lines.slice(5, 6)[0]; // 22 23 <=> 5 6
  const nearbyTickets = lines.slice(8, lines.length); //25 LL <=> 8 LL

  const instructionsObject = createInstructionsObject(instructions);
  const ticketErrorRate = checkTicketErrorRate(ticket, instructionsObject);
  const nearbyTicketsErrorRate = checkGroupOfTickets(nearbyTickets, instructionsObject);

  const validTickets = removeInvalidTickets(nearbyTickets, instructionsObject);

  // console.log(nearbyTicketsErrorRate, nearbyTickets, validTickets);
};

setTimeout(main, 1000);