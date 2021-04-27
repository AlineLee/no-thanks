import { useState } from 'react';
import styled from 'styled-components';

import PlayerCards from './PlayerCards';
import { PlayerType } from '../AppService';
import Coin from './Coin';

const Container = styled('ul')`
  display: block;
  padding: 10px 0 10px 0;
  margin: 0;
`;

const StyledPlayer = styled('li')`
  &:not(:last-child) {
    padding-bottom: 20px;
  }
`;

const Score = styled('p')`
  border-radius: 50%;
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: #20aaff;
  padding: 10px;
  margin: 0;
  vertical-align: middle;
  box-shadow: 1px 1px 3px #0000003b;
`;

const Name = styled('p')`
  margin: 0;
  text-overflow: ellipsis;
  width: 70px;
  white-space: nowrap;
  overflow: hidden;
`;

const StyledPlayerCards = styled(PlayerCards)`
  display: block;
`;

const Info = styled('div')`
  background-color: #f0effd;
  display: flex;
  padding: 10px 40px;
  border-radius: 50px;
  align-items: center;
  justify-content: space-between;
  min-width: 200px;
  flex-wrap: wrap;
  position: relative;
`;

const ShowCards = styled('button')`
  border: none;
  background-color: #8176dcc7;
  width: 30px;
  height: 100%;
  border-radius: 0 100% 100% 0 / 0 50% 50% 0;
  border-bottom: 0;
  position: absolute;
  right: 0;
  color: white;
`;

const Wrapper = styled('div')`
  position: relative;
  display: block;
  padding: 10px 0 10px 0;
  margin: 0;
  background-color: #cccfe3;
`;

const ShowDetails = styled('button')`
  border-radius: 50%;
  border: none;
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: #20aaff;
  margin: 0;
  box-shadow: 1px 1px 3px #0000003b;
  margin-left: 10px;
  vertical-align: text-bottom;
`;

function Player(props: PlayerType) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <StyledPlayer key={props.id}>
      <Info>
        <Name>{props.name}</Name>
        <Score>{props.score}</Score>
        <Coin /> {props.coins}
        {props.orderedCards && props.orderedCards.length > 0 && (
          <ShowCards onClick={() => setShow(!show)}>{'>'}</ShowCards>
        )}
      </Info>

      {show && props.orderedCards && props.orderedCards.length > 0 && (
        <StyledPlayerCards cards={props.orderedCards} />
      )}
    </StyledPlayer>
  );
};

function Players({list}: {list: PlayerType[]}) {
  const [minimized, setMinimized] = useState<boolean>(true);

  return (
    <Wrapper>
      {list && list.length > 0 && minimized && (
        <>
          Players
          <ShowDetails onClick={() => setMinimized(!minimized)}>{'v'}</ShowDetails>
        </>
      )}
      {list && list.length > 0 && !minimized && (
        <>
          Players
          <ShowDetails onClick={() => setMinimized(!minimized)}>{'v'}</ShowDetails>
          <Container>
            {list && list.map((item) => (
              <Player {...item} />
            ))}
          </Container>
        </>
      )}
    </Wrapper>
  );
};

export default Players;