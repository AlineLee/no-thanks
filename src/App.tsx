import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';

import { calcScore, splitPlayerDeck, getShuffledDeck, PlayerType, CardType } from './AppService';
import Players from './components/Players';
import Table from './components/Table';
import PlayerActions from './components/PlayerActions';
import Button from './components/Button';

const Page = styled('div')`
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto auto;
  text-align: center;
  background-color: white;
`;

const Turn = styled('div')`
  background-color: #ffe65a;
  padding: 30px 0;
`;

const Header = styled('header')`
  background-color: white;
  text-transform: uppercase;
  font-weight: 300;
  padding: 20px;
  box-shadow: 0px 5px 5px 0px #0000003b;
  z-index: 1;
`;

const Footer = styled('footer')`
  background-color: #cccfe2;
  padding: 10px;
`;

const Main = styled('main')`
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

function App() {
  const [finished, setFinished] = useState(true);

  const [players, setPlayers] = useState<PlayerType[]> ([]);
  const [tableCards, setTableCards] = useState<CardType[]> ([]);
  const [tableCoins, setTableCoins] = useState<number>(0);
  const [turn, setTurn] = useState(0);
  const [player, setPlayer] = useState<PlayerType>();

  const [ deck, setDeck ] = useState<CardType[]>([]);

  useEffect(() => {
    setDeck(getShuffledDeck());
  },[]);

  const updatePlayer = (player: PlayerType) => {
    player.score = calcScore(player);
    setPlayers((arr) =>
      arr.map((item) => item.id === player.id ? player : item)
    );
  };

  const handleCardsOrder = ({ player, payToPass }:{ player: PlayerType, payToPass: boolean }) => {
    if (!payToPass) {
      player.coins += tableCoins;
      player.cards = [...player.cards, ...tableCards];
      player.orderedCards = splitPlayerDeck(player);

      setTableCoins(0);
      setTableCards([]);

      updatePlayer(player);
    }

    if (payToPass) {
      setTableCoins((item) => item + 1);
      player.coins -= 1;
      setPlayers((arr) => arr.map((item) => item.id === player.id ? player : item));
    }
    handleNextTurn();
  };

  const handleNextTurn = () => {
    const currentTurn = turn + 1;

    if (!deck[currentTurn - 1]) {
      setFinished(true);
      return;
    }
    setTurn(currentTurn);
  }

  const selectPlayer = (turn: number) => {
    if (players.length >= turn) {
      setPlayer(players[turn -1]);
      return;
    }
    const modd = turn % players.length;
    const a = modd === 0 ? players.length : modd;

    setPlayer(players[a - 1]);
  }

  useEffect(() => {
    if (!turn) {
      return;
    }
    if (deck[turn - 1]) {
      setTableCards([...tableCards, deck[turn - 1]]);
    }
    selectPlayer(turn);
  },[turn]);

  const init = () => {
    setTurn(1);
    setPlayers([
      { id: 1, name: 'Aline', coins: 11, cards: [], score: 0 },
      { id: 2, name: 'Diego', coins: 11, cards: [], score: 0 },
      { id: 3, name: 'Nimbus', coins: 11, cards: [], score: 0 },
    ]);
    setTableCards([]);
    selectPlayer(1);
    setFinished(false);
  }

  return (
    <Page>
      <Header>no thanks</Header>
      <Main>
        <Turn>Turn {turn} {player?.name}</Turn>

        <Table coins={tableCoins} cards={tableCards} />

        {finished && (
          <Button data-testid='init' onClick={() => init()}>Start</Button>
        )}
        <Players list={players} />
        {!finished && player && (
          <PlayerActions player={player} handleCardsOrder={handleCardsOrder} />
        )}
      </Main>
      <Footer>@alinelee</Footer>
    </Page>
  );
}

export default App;
