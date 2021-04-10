import React from 'react';
import styled from 'styled-components';

import { PlayerType } from '../AppService';

const Actions = styled('div')`
  display: flex;
  justify-content: space-around;
`;

const Button = styled('button')`
  font-family: inherit;
  background-color: #51c4cc;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
`;

type BlaProps = {
  player: PlayerType;
  handleCardsOrder: ({player, payToPass}: {player: PlayerType, payToPass: boolean}) => void;
}

function PlayerActions({player, handleCardsOrder}: BlaProps) {
  return (
    <>
      <p>Its your turn {player.name}</p>
      <Actions>
        <Button onClick={() => handleCardsOrder({ player, payToPass: false })}>
          Yes, please
        </Button>
        {player.coins > 0 && (
          <Button onClick={() => handleCardsOrder({ player, payToPass: true })}>
            No, thanks
          </Button>
        )}
      </Actions>
    </>
  );
};

export default PlayerActions;