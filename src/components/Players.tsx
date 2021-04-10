import React from 'react';
import styled from 'styled-components';

import PlayerCards from './PlayerCards';
import { PlayerType } from '../AppService';

const Container = styled('ul')`
  display: block;
  padding: 0;
`;

const Player = styled('li')`
  margin-top: 10px;
`;

function Players({list}: {list: PlayerType[]}) {
  return (
    <Container>
      {list && list.map((item) => (
        <Player key={item.id}>
          {item.name} - Coins {item.coins} ({item.score})
          {item.orderedCards && item.orderedCards.length > 0 && (
            <PlayerCards cards={item.orderedCards} />
          )}
        </Player>
      ))}
    </Container>
  );
};

export default Players;