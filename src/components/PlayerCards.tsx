import React from 'react';
import styled from 'styled-components';

import { CardType } from '../AppService';
import TinyCard from './TinyCard';

const Sequence = styled('ul')`
  display: inline-block;
  margin-bottom: 5px;
  margin-top: 10px;
`;

function PlayerCards({cards}: {cards:CardType[][]}) {
  return (
    <ul>
      {cards.map((orderedCards) => (
        <Sequence>
          {orderedCards.map((card) => (
            <TinyCard {...card} />
          ))}
        </Sequence>
      ))}
    </ul>
  );
};

export default PlayerCards;