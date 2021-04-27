import React from 'react';
import styled from 'styled-components';

import { CardType } from '../AppService';

const Container = styled('li')`
  display: inline-block;
  padding: 5px;
  border-radius: 4px;
  text-align: left;
  position: relative;
  margin-bottom: -20px;
  margin-left: -40px;
  background-color: #f0effd;
  box-shadow: -1px 1px 5px #0000003b;
  font-size: 11px;
`;

const CardCore = styled('span')`
  padding: 5px;
  background-color: #8176dd;
  background-color: #ff7632;
  border-radius: 4px 4px 0 0;
  display: block;
  color: white;
  font-size: 16px;
  width: 40px;
  margin-bottom: -1px;
`;

const UpsideDown = styled('div')`
  transform: rotate(180deg);
`;

function TinyCard(props: CardType) {
  return (
    <Container key={`ord-${props.number}`}>
      {props.number.toString().padStart(2, '0')}
      <CardCore>
        {props.number.toString().padStart(2, '0')}
      </CardCore>
      <UpsideDown>
        {props.number.toString().padStart(2, '0')}
        <CardCore>
            {props.number.toString().padStart(2, '0')}
        </CardCore>
      </UpsideDown>
    </Container>
  );
};

export default TinyCard;