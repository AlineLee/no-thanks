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
    console.log(item.number)
    number++;
    subDecks[number] = [];
    subDecks[number].push(item);
  });
  return subDecks;
};