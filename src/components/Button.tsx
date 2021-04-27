import React from 'react';
import styled from 'styled-components';

const StyledButton = styled('button')`
  font-family: inherit;
  border: none;
  border-radius: 20px;
  padding: 10px 50px;
  color: white;
  font-size: 16px;
  background-color: #8176dd;
  box-shadow: 1px 1px 3px #0000003b;
`;

function Button(props: any) {
  return (
    <StyledButton {...props} />
  );
};

export default Button;