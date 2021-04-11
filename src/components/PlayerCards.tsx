import styled from 'styled-components';

import { CardType } from '../AppService';
import TinyCard from './TinyCard';

const Sequence = styled('ul')`
  display: inline-block;
  margin-bottom: 5px;
  margin-top: 10px;
`;

const Container = styled('ul')`
  padding: 0;
  margin: 0;
  display: block;
`;

function PlayerCards({cards}: {cards:CardType[][]}) {
  return (
    <Container>
      {cards.map((orderedCards) => (
        <Sequence>
          {orderedCards.map((card) => (
            <TinyCard {...card} />
          ))}
        </Sequence>
      ))}
    </Container>
  );
};

export default PlayerCards;