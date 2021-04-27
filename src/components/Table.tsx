import React from 'react';
import styled from 'styled-components';

import { CardType } from '../AppService';
import Card from './Card';
import Coin from './Coin';

const Container = styled('div')`
  position: relative;
`;

const Deck = styled('ul')`
  display: block;
  padding: 0;
  margin-left: calc(10px + 70px);
  margin-right: 10px;
  margin-bottom: 30px;
`;

const Points = styled('div')`
  position: absolute;
  right: 10px;
  z-index: 1;
  p {
    margin-left: 10px;
    display: inline-block;
  }
`;

function Table({coins, cards}: { coins: number, cards: CardType[]}) {
  return (
    <Container>
      <Points>
        <Coin />
        <p>{coins ? coins.toString().padStart(2, '0') : 0}</p>
      </Points>

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