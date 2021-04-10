import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';

import { calcScore, splitPlayerDeck, getShuffledDeck, PlayerType, CardType } from './AppService';
import Players from './components/Players';
import Table from './components/Table';
import PlayerActions from './components/PlayerActions';

const Page = styled('div')`
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  text-align: center;
  background-color: #bed1bf;
`;

const Button = styled('button')`
  font-family: inherit;
  background-color: #51c4cc;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
`;

const Turn = styled('div')`
  background-color: #f36380;
  padding: 10px 0;
`;

const Header = styled('header')`
  background-color: #51c4cc;
  text-transform: uppercase;
  font-weight: 300;
  padding: 10px;
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
      <main>
        <Turn>Turn {turn}</Turn>

        <Table coins={tableCoins} cards={tableCards} />

        {!finished && player && (
          <PlayerActions player={player} handleCardsOrder={handleCardsOrder} />
        )}

        <Players list={players} />

        {finished && (
          <Button data-testid='init' onClick={() => init()}>Start</Button>
        )}
      </main>
      <div>@alinelee</div>
    </Page>
  );
}

export default App;
