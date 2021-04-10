import React from 'react';
import styled from 'styled-components';

import { CardType } from '../AppService';

const Container = styled('li')`
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

function TinyCard(props: CardType) {
  return (
    <Container key={`ord-${props.number}`}>
      {props.number.toString().padStart(2, '0')}
      <CardCore>
        {props.number.toString().padStart(2, '0')}
      </CardCore>
    </Container>
  );
};

export default TinyCard;