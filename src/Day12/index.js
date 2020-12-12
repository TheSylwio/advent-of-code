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

const moveForward = (facing, value, shipPosition) => {
  switch (facing) {
    case 0:
      shipPosition.east += value;
      break;
    case 1:
      shipPosition.north -= value;
      break;
    case 2:
      shipPosition.east -= value;
      break;
    case 3:
      shipPosition.north += value;
  }

  return shipPosition;
};

const rotateShip = (direction, value, facing) => {
  let rotation = value / 90;
  if (direction === 'L') rotation *= -1;
  if (rotation < 0) rotation += 4;

  return (facing + rotation) % 4;
};

const moveIntoDirection = (direction, value, waypoint) => {
  switch (direction) {
    case 'N':
      waypoint.north += value;
      break;
    case 'E':
      waypoint.east += value;
      break;
    case 'S':
      waypoint.north -= value;
      break;
    case 'W':
      waypoint.east -= value;
  }

  return waypoint;
};

const getManhattanDistance = ({ east, north }) => Math.abs(east) + Math.abs(north);

const moveShipToWaypoint = (value, waypoint, ship) => {
  const moveToEast = value * waypoint.east;
  const moveToNorth = value * waypoint.north;

  return {
    east: ship.east + moveToEast,
    north: ship.north + moveToNorth,
  };
};

const moveWaypoint = (direction, value, waypoint) => {
  const copy = { ...waypoint };

  switch (direction) {
    case 'N':
      copy.north += value;
      break;
    case 'E':
      copy.east += value;
      break;
    case 'S':
      copy.north -= value;
      break;
    case 'W':
      copy.east -= value;
  }

  return copy;
};

const swapCoordinates = (rotations, waypoint) => {
  let { east, north } = { ...waypoint };
  while (rotations > 0) {
    [east, north] = [north, east * -1];
    rotations--;
  }

  return { east, north };
};

const rotateWaypoint = (direction, value, waypoint) => {
  let rotations = value / 90;
  if (direction === 'L') rotations *= -1;
  if (rotations < 0) rotations += 4;

  return swapCoordinates(rotations % 4, waypoint);
};

const main = () => {
  const objectCommands = createObjects(commands);
  // Part 1
  let shipPosition = { east: 0, north: 0 };
  let facing = 0; // Facing: 0 - EAST, 1 - SOUTH, 2 - WEST, 3 - NORTH

  for (let { direction, value } of objectCommands) {
    if (direction === 'F') {
      shipPosition = moveForward(facing, value, shipPosition);
    }
    if (['L', 'R'].includes(direction)) {
      facing = rotateShip(direction, value, facing);
    }
    if (['N', 'E', 'S', 'W'].includes(direction)) {
      shipPosition = moveIntoDirection(direction, value, shipPosition);
    }
  }

  // Part 2
  let waypoint = { east: 10, north: 1 }, ship = { east: 0, north: 0 };

  for (let { direction, value } of objectCommands) {
    if (direction === 'F') {
      ship = moveShipToWaypoint(value, waypoint, ship);
    }
    if (['N', 'E', 'S', 'W'].includes(direction)) {
      waypoint = moveWaypoint(direction, value, waypoint);
    }
    if (['L', 'R'].includes(direction)) {
      waypoint = rotateWaypoint(direction, value, waypoint);
    }
  }
  console.log(`#1 Manhattan distance: ${getManhattanDistance(shipPosition)}`);
  console.log(`#2 Manhattan distance: ${getManhattanDistance(ship)}`);
};

setTimeout(main, 1000);