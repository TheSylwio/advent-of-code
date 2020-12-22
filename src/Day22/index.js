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

const main = () => {
  const firstPlayerDeck = lines.slice(1, 26).map(el => Number(el));
  const secondPlayerDeck = lines.slice(28, lines.length).map(el => Number(el));

  while (firstPlayerDeck.length !== 0 && secondPlayerDeck.length !== 0) {
    const firstPlayerCard = firstPlayerDeck.shift();
    const secondPlayerCard = secondPlayerDeck.shift();

    if (firstPlayerCard > secondPlayerCard) {
      firstPlayerDeck.push(firstPlayerCard, secondPlayerCard);
    } else {
      secondPlayerDeck.push(secondPlayerCard, firstPlayerCard);
    }
  }

  const points = firstPlayerDeck.length !== 0 ? getPoints(firstPlayerDeck) : getPoints(secondPlayerDeck);

  console.log(points);
};

setTimeout(main, 1000);