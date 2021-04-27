import React from 'react';
import styled from 'styled-components';

const Style = styled('span')`
  background-color: #ffaf00;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: inline-block;
  padding: 10px;
  vertical-align: middle;
  box-shadow: 1px 1px 3px #0000003b;
  &:after {
    content: '';
    display: inline-block;
    background-color: #fff67e;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 3px;
    transform: rotate(45deg);
  }
`;

function Coin() {
  return (
    <Style />
  );
};

export default Coin;