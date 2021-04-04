import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';

import { calcScore, splitPlayerDeck, PlayerType, CardType } from './AppService';

const Card = styled('li')`
  display: inline-block;
  padding: 10px;
  border: solid 1px;
`;

const Players = styled('ul')`
  display: block;
`;

const Table = styled('ul')`
  display: block;
`;

const Sequence = styled('ul')`
  display: block;
  border: solid 1px;
  margin-bottom: 5px;
`;

function App() {
  const deck: CardType[] = [
    { number: 3, color: 'red' },
    { number: 4, color: 'red' },
    { number: 5, color: 'red' },
    { number: 6, color: 'red' },
    { number: 7, color: 'red' },
    { number: 8, color: 'red' },
    { number: 9, color: 'red' },
    { number: 10, color: 'red' },
    { number: 11, color: 'red' },
    { number: 12, color: 'red' },
    { number: 13, color: 'red' },
    { number: 14, color: 'red' },
    { number: 15, color: 'red' },
    { number: 16, color: 'red' },
    { number: 17, color: 'red' },
    { number: 18, color: 'red' },
    { number: 19, color: 'red' },
    { number: 20, color: 'red' },
    { number: 21, color: 'red' },
    { number: 22, color: 'red' },
    { number: 23, color: 'red' },
    { number: 24, color: 'red' },
    { number: 25, color: 'red' },
    { number: 26, color: 'red' },
    { number: 27, color: 'red' },
    { number: 28, color: 'red' },
    { number: 29, color: 'red' },
    { number: 30, color: 'red' },
    { number: 31, color: 'red' },
    { number: 32, color: 'red' },
    { number: 33, color: 'red' },
    { number: 34, color: 'red' },
    { number: 35, color: 'red' },
  ]

  const [finished, setFinished] = useState(true);

  const [players, setPlayers] = useState<PlayerType[]> ([]);
  const [tableCards, setTableCards] = useState<CardType[]> ([]);
  const [tableCoins, setTableCoins] = useState<number>(0);
  const [turn, setTurn] = useState(0);
  const [player, setPlayer] = useState<PlayerType>();

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
      { id: 1, name: 'Aline', coins: 10, cards: [], score: 0 },
      { id: 2, name: 'Diego', coins: 10, cards: [], score: 0 },
    ]);
    setTableCards([]);
    selectPlayer(1);
    setFinished(false);
  }

  return (
    <div className="App">
      <header className="App-header">no thanks</header>
      <main>
        <Players>
          {players && players.map((item) => (
            <Card key={item.id}>
              {item.name} - Coins {item.coins} ({item.score})

              {item.orderedCards && item.orderedCards.length > 0 && (
                <ul>
                  {item.orderedCards.map((orderedCards) => (
                    <Sequence>
                      {orderedCards.map((card) => (
                        <li key={`ord-${card.number}`}>{card.number}</li>
                      ))}
                    </Sequence>
                  ))}
                </ul>
              )}
            </Card>
          ))}
        </Players>

        <Table>
          {tableCoins > 0 && (
            <p>Coins: {tableCoins}</p>
          )}
          {tableCards && tableCards.length > 0 && (
            <ul>
              {tableCards.map((item) => (
                <Card key={item.number}>
                  {item.number}
                </Card>
              ))}
            </ul>
          )}
        </Table>

        {!finished && (
          <div>
            Turn: {turn}
            {player && (
              <>
                <p>Its your turn:</p>
                <Card key={player.id}>{player.name}</Card>
                <button onClick={() => handleCardsOrder({ player, payToPass: false })}>Get cards/coins</button>
                {player.coins > 0 && (
                  <button onClick={() => handleCardsOrder({ player, payToPass: true })}>Pay to pass</button>
                )}
              </>
            )}
          </div>
        )}

        {finished && (
          <button onClick={() => init()}>Init</button>
        )}
      </main>
    </div>
  );
}

export default App;
