import { calcScore, splitPlayerDeck } from './AppService';

describe('calcScore', () => {
  const cards = [
    { number: 3, color: 'red' },
    { number: 4, color: 'red' },
    { number: 5, color: 'red' },
    { number: 6, color: 'red' },
    { number: 7, color: 'red' },
  ];

  describe('should return the correct value', () => {
    test('when there is a single sequence', () => {
      const orderedCards = [
        [
          { number: 3, color: 'red' },
          { number: 4, color: 'red' },
          { number: 5, color: 'red' },
          { number: 6, color: 'red' },
          { number: 7, color: 'red' },
        ]
      ];

      const player = { id: 1, name: 'Aline', coins: 2, cards, orderedCards, score: 0 };
      const subject = calcScore(player);
      expect(subject).toBe(1);
    });

    test('when there is a multiple sequences', () => {
      const orderedCards = [
        [
          { number: 3, color: 'red' },
          { number: 4, color: 'red' },
          { number: 5, color: 'red' },
        ],
        [
          { number: 7, color: 'red' },
          { number: 8, color: 'red' },
        ],
        [
          { number: 11, color: 'red' },
          { number: 12, color: 'red' },
          { number: 13, color: 'red' },
          { number: 14, color: 'red' },
          { number: 15, color: 'red' },
        ]
      ];

      const player = { id: 1, name: 'Diego', coins: 2, cards, orderedCards, score: 0 };
      const subject = calcScore(player);
      expect(subject).toBe(19);
    });

    test('when there is no coins', () => {
      const orderedCards = [
        [
          { number: 3, color: 'red' },
          { number: 4, color: 'red' },
          { number: 5, color: 'red' },
          { number: 6, color: 'red' },
          { number: 7, color: 'red' },
        ]
      ];

      const player = { id: 1, name: 'Diego', coins: 0, cards, orderedCards, score: 0 };
      const subject = calcScore(player);
      expect(subject).toBe(3);
    });

    test('when there is more coins than points', () => {
      const orderedCards = [
        [
          { number: 3, color: 'red' },
          { number: 4, color: 'red' },
          { number: 5, color: 'red' },
          { number: 6, color: 'red' },
          { number: 7, color: 'red' },
        ]
      ];

      const player = { id: 1, name: 'Diego', coins: 10, cards, orderedCards, score: 0 };
      const subject = calcScore(player);
      expect(subject).toBe(0);
    });

    test('when there is the same number of coins and points', () => {
      const orderedCards = [
        [
          { number: 3, color: 'red' },
          { number: 4, color: 'red' },
          { number: 5, color: 'red' },
          { number: 6, color: 'red' },
          { number: 7, color: 'red' },
        ]
      ];

      const player = { id: 1, name: 'Diego', coins: 3, cards, orderedCards, score: 0 };
      const subject = calcScore(player);
      expect(subject).toBe(0);
    });
  });

  describe('should return 0', () => {
    test('when there is no ordered cards', () => {
      const player = { id: 1, name: 'Aline', coins: 2, cards, score: 0 };
      const subject = calcScore(player);
      expect(subject).toBe(0);
    });

    test('when there is no ordered cards and no coins', () => {
      const player = { id: 1, name: 'Aline', coins: 0, cards, score: 0 };
      const subject = calcScore(player);
      expect(subject).toBe(0);
    });
  });
});

describe('splitPlayerDeck', () => {
  describe('should return the correct cards', () => {
    test('when there is a single sequence', () => {
      const cards = [
        { number: 3, color: 'red' },
        { number: 4, color: 'red' },
        { number: 5, color: 'red' },
        { number: 6, color: 'red' },
        { number: 7, color: 'red' },
      ];

      const player = { id: 1, name: 'Aline', coins: 2, cards, score: 0 };
      const subject = splitPlayerDeck(player);
      expect(subject).toStrictEqual([[
        { number: 3, color: 'red' },
        { number: 4, color: 'red' },
        { number: 5, color: 'red' },
        { number: 6, color: 'red' },
        { number: 7, color: 'red' },
      ]]);
    });

    test('when there is multiples sequences', () => {
      const cards = [
        { number: 3, color: 'red' },
        { number: 6, color: 'red' },
        { number: 7, color: 'red' },
        { number: 10, color: 'red' },
        { number: 15, color: 'red' },
      ];

      const player = { id: 1, name: 'Aline', coins: 2, cards, score: 0 };
      const subject = splitPlayerDeck(player);
      expect(subject).toStrictEqual([
        [
          { number: 3, color: 'red' },
        ],
        [
          { number: 6, color: 'red' },
          { number: 7, color: 'red' },
        ],
        [
          { number: 10, color: 'red' },
        ],
        [
          { number: 15, color: 'red' },
        ]
      ]);
    });

    test('when there is multiples sequences without order', () => {
      const cards = [
        { number: 10, color: 'red' },
        { number: 3, color: 'red' },
        { number: 15, color: 'red' },
        { number: 7, color: 'red' },
        { number: 6, color: 'red' },
      ];

      const player = { id: 1, name: 'Aline', coins: 2, cards, score: 0 };
      const subject = splitPlayerDeck(player);
      expect(subject).toStrictEqual([
        [
          { number: 3, color: 'red' },
        ],
        [
          { number: 6, color: 'red' },
          { number: 7, color: 'red' },
        ],
        [
          { number: 10, color: 'red' },
        ],
        [
          { number: 15, color: 'red' },
        ]
      ]);
    });
  });

  describe('should return the correct cards', () => {
    test('when there is an empty array of cards', () => {
      const player = { id: 1, name: 'Aline', coins: 2, cards: [], score: 0 };
      const subject = splitPlayerDeck(player);
      expect(subject).toStrictEqual([]);
    });
  });
});