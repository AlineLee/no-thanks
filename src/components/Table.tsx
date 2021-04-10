import React from 'react';
import styled from 'styled-components';

import { CardType } from '../AppService';
import Card from './Card';

const Container = styled('ul')`
  display: block;
  padding: 30px 0;
  background-color: #607d8b;
  margin: 0;
`;

const Deck = styled('ul')`
  display: block;
  padding: 0;
  margin-left: 70px;
`;

function Table({coins, cards}: { coins: number, cards: CardType[]}) {
  return (
    <Container>
      <p>Coins: {coins}</p>
      {cards.length > 0 && (
        <Deck>
          {cards.map((item) => (
            <Card {...item} />
          ))}
        </Deck>
      )}
    </Container>
  );
};

export default Table;