const lineReader = require('line-reader');

const path = './input.txt';
let commands = [];

lineReader.eachLine(path, line => {
  commands = [...commands, line];
});

const createObjects = commands => {
  let objects = [];

  for (let command of commands) {
    const newObject = {
      direction: command.substring(0, 1),
      value: Number(command.substring(1)),
    };

    objects = [...objects, newObject];
  }

  return objects;
};

const moveForward = (facing, value, east, north) => {
  switch (facing) {
    case 0:
      east += value;
      break;
    case 1:
      north -= value;
      break;
    case 2:
      east -= value;
      break;
    case 3:
      north += value;
  }

  return [east, north];
};

const rotateShip = (direction, value, facing) => {
  let rotation = value / 90;
  if (direction === 'L') rotation *= -1;
  if (rotation < 0) rotation += 4;

  return (facing + rotation) % 4;
};

const moveIntoDirection = (direction, value, east, north) => {
  switch (direction) {
    case 'N':
      north += value;
      break;
    case 'E':
      east += value;
      break;
    case 'S':
      north -= value;
      break;
    case 'W':
      east -= value;
  }

  return [east, north];
};

const getManhattanDistance = (east, north) => Math.abs(east) + Math.abs(north);

const main = () => {
  const objectCommands = createObjects(commands);
  let east = 0, north = 0, facing = 0; // Facing: 0 - EAST, 1 - SOUTH, 2 - WEST, 3 - NORTH

  for (let { direction, value } of objectCommands) {
    if (direction === 'F') {
      [east, north] = moveForward(facing, value, east, north);
    }
    if (['L', 'R'].includes(direction)) {
      facing = rotateShip(direction, value, facing);
    }
    if (['N', 'E', 'S', 'W'].includes(direction)) {
      [east, north] = moveIntoDirection(direction, value, east, north);
    }
  }

  console.log(`Manhattan distance: ${getManhattanDistance(east, north)}`);
};

setTimeout(main, 1000);