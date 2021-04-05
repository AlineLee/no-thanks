import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';

import { calcScore, splitPlayerDeck, getShuffledDeck, PlayerType, CardType } from './AppService';

const Page = styled('div')`
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  text-align: center;
  background-color: #bed1bf;
`;

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

const Card = styled('li')`
  display: inline-block;
  padding: 10px;
  border: solid 1px;
  border-radius: 3px;
  background-color: white;
  text-align: left;
  position: relative;
  margin-bottom: -10px;
  margin-left: -70px;
`;

const CardCore = styled('span')`
  padding: 10px;
  background-color: #f36380;
  display: block;
  color: white;
  font-size: 35px;
  width: 80px;
  margin-bottom: -1px;
`;

const Deck = styled('ul')`
  display: block;
  padding: 0;
  margin-left: 70px;
`;

const Turn = styled('div')`
  background-color: #f36380;
  padding: 10px 0;
`;

const UpsideDown = styled('div')`
  transform: rotate(180deg);
`;

const Players = styled('ul')`
  display: block;
  padding: 0;
`;

const Player = styled('li')`
  margin-top: 10px;
`;

const Table = styled('ul')`
  display: block;
  padding: 30px 0;
  background-color: #607d8b;
  margin: 0;
`;

const Sequence = styled('ul')`
  display: inline-block;
  margin-bottom: 5px;
  margin-top: 10px;
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

        {tableCards.length > 0 && (
          <Table>
            <p>Coins: {tableCoins}</p>
            {tableCards.length > 0 && (
              <Deck>
                {tableCards.map((item) => (
                  <Card key={item.number}>
                    {item.number.toString().padStart(2, '0')}
                    <CardCore>
                      {item.number.toString().padStart(2, '0')}
                    </CardCore>
                    <UpsideDown>
                      {item.number.toString().padStart(2, '0')}
                      <CardCore>
                        {item.number.toString().padStart(2, '0')}
                      </CardCore>
                    </UpsideDown>
                  </Card>
                ))}
              </Deck>
            )}
          </Table>
        )}

        {!finished && player && (
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
        )}

        <Players>
          {players && players.map((item) => (
            <Player key={item.id}>
              {item.name} - Coins {item.coins} ({item.score})

              {item.orderedCards && item.orderedCards.length > 0 && (
                <ul>
                  {item.orderedCards.map((orderedCards) => (
                    <Sequence>
                      {orderedCards.map((card) => (
                        <Card key={`ord-${card.number}`}>
                          {card.number.toString().padStart(2, '0')}
                          <CardCore>
                            {card.number.toString().padStart(2, '0')}
                          </CardCore>
                        </Card>
                      ))}
                    </Sequence>
                  ))}
                </ul>
              )}
            </Player>
          ))}
        </Players>

        {finished && (
          <Button data-testid='init' onClick={() => init()}>Start</Button>
        )}
      </main>
      <div>@alinelee</div>
    </Page>
  );
}

export default App;
