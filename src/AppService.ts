export type CardType = {
  number: number,
  color: string,
}

export type PlayerType = {
  id: number,
  name: string,
  coins: number,
  cards: CardType[],
  orderedCards?: CardType[][],
  score: number,
}

export const calcScore = (player: PlayerType): number => {
  const points = player.orderedCards ? player.orderedCards.reduce((acc, item) => acc + item[0].number, 0) : 0;
  return player.coins >= points ? 0 : points - player.coins;
};

export const splitPlayerDeck = (player: PlayerType): CardType[][] => {
  const subDecks: CardType[][] = [];
  let number = 0;
  const ordered = player.cards.sort((a,b) => a.number - b.number);
  ordered.forEach((item, index) => {
    if (index === 0) {
      subDecks[number] = [];
      subDecks[number].push(item);
      return;
    }
    if (item.number === ordered[index - 1].number + 1) {
      subDecks[number].push(item);
      return;
    };
    number++;
    subDecks[number] = [];
    subDecks[number].push(item);
  });
  return subDecks;
};

const deck: CardType[] = [
  { number: 3, color: 'red' },
  { number: 4, color: 'red' },
  { number: 5, color: 'red' },
  { number: 6, color: 'red' },
  { number: 7, color: 'red' },
  { number: 8, color: 'red' },
  { number: 9, color: 'red' },
  { number: 10, color: 'red' },
  { number: 11, color: 'red' },
  { number: 12, color: 'red' },
  { number: 13, color: 'red' },
  { number: 14, color: 'red' },
  { number: 15, color: 'red' },
  { number: 16, color: 'red' },
  { number: 17, color: 'red' },
  { number: 18, color: 'red' },
  { number: 19, color: 'red' },
  { number: 20, color: 'red' },
  { number: 21, color: 'red' },
  { number: 22, color: 'red' },
  { number: 23, color: 'red' },
  { number: 24, color: 'red' },
  { number: 25, color: 'red' },
  { number: 26, color: 'red' },
  { number: 27, color: 'red' },
  { number: 28, color: 'red' },
  { number: 29, color: 'red' },
  { number: 30, color: 'red' },
  { number: 31, color: 'red' },
  { number: 32, color: 'red' },
  { number: 33, color: 'red' },
  { number: 34, color: 'red' },
  { number: 35, color: 'red' },
];

export const getShuffledDeck = () : CardType[] => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  const limitedDeck = deck.splice(9, deck.length - 1);
  return limitedDeck;
};