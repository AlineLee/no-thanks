import React from 'react';
import styled from 'styled-components';

import { CardType } from '../AppService';

const Container = styled('li')`
  display: inline-block;
  padding: 10px;
  border-radius: 6px;
  text-align: left;
  position: relative;
  margin-bottom: -20px;
  margin-left: -70px;
  background-color: #f0effd;
  box-shadow: -1px 1px 5px #0000003b;
`;

const CardCore = styled('span')`
  padding: 10px;
  background-color: #8176dd;
  background-color: #ff7632;
  border-radius: 6px 6px 0 0;
  display: block;
  color: white;
  font-size: 35px;
  width: 80px;
  margin-bottom: -1px;
`;

const UpsideDown = styled('div')`
  transform: rotate(180deg);
`;

function Card(props: CardType) {
    return (
        <Container key={props.number}>
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

export default Card;