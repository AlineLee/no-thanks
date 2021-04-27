import React from 'react';
import styled from 'styled-components';

import { PlayerType } from '../AppService';
import Button from './Button';

const Actions = styled('div')`
  display: flex;
  justify-content: space-around;
`;

const Container = styled('div')`
  background-color: #f0effd;
  padding: 10px;
`;

type BlaProps = {
  player: PlayerType;
  handleCardsOrder: ({player, payToPass}: {player: PlayerType, payToPass: boolean}) => void;
}

function PlayerActions({player, handleCardsOrder}: BlaProps) {
  return (
    <Container>
      <p>Its your turn {player.name}</p>
      <Actions>
        <Button onClick={() => handleCardsOrder({ player, payToPass: false })}>Yes, please</Button>

        {player.coins > 0 && (
          <Button onClick={() => handleCardsOrder({ player, payToPass: true })}>
            No, thanks
          </Button>
        )}
      </Actions>
    </Container>
  );
};

export default PlayerActions;