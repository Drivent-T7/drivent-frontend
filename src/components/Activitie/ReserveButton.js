import { useState } from 'react';
import { ButtonWrapper } from './ButtonWrapper';

export function ReserveButton({ children, choosen, findActivies, id }) {
  return (
    <ButtonWrapper choosen={choosen} onClick={() => findActivies(id)}>{children}</ButtonWrapper>
  );
}
