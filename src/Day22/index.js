const lineReader = require('line-reader');

const path = './input.txt';
let lines = [];

lineReader.eachLine(path, line => {
  lines = [...lines, line];
});

const getPoints = deck => {
  let multiplier = deck.length;
  return deck.map(el => el * multiplier--).reduce((prev, curr) => prev + curr);
};

const playGame = (firstDeck, secondDeck) => {
  const firstPlayerRounds = new Set();
  const secondPlayerRounds = new Set();
  let firstPlayerWonGame;

  while (firstDeck.length > 0 && secondDeck.length > 0) {
    const firstPlayerRound = firstDeck.join(',');
    const secondPlayerRound = secondDeck.join(',');

    if (firstPlayerRounds.has(firstPlayerRound) || secondPlayerRounds.has(secondPlayerRound)) return true;

    const firstCard = firstDeck.shift();
    const secondCard = secondDeck.shift();

    if (firstCard <= firstDeck.length && secondCard <= secondDeck.length) {
      firstPlayerWonGame = playGame(firstDeck.slice(0, firstCard), secondDeck.slice(0, secondCard));
    } else {
      firstPlayerWonGame = firstCard > secondCard;
    }

    firstPlayerWonGame ? firstDeck.push(firstCard, secondCard) : secondDeck.push(secondCard, firstCard);

    firstPlayerRounds.add(firstPlayerRound);
    secondPlayerRounds.add(secondPlayerRound);
  }

  return firstDeck.length > secondDeck.length;
};

const main = () => {
  const firstPlayerDeck = lines.slice(1, 26).map(Number);
  const secondPlayerDeck = lines.slice(28, lines.length).map(Number);

  playGame(firstPlayerDeck, secondPlayerDeck);

  const points = firstPlayerDeck.length !== 0 ? getPoints(firstPlayerDeck) : getPoints(secondPlayerDeck);

  console.log(points);
};

setTimeout(main, 1000);