import { ButtonWrapper } from './ButtonWrapper';

export function ReserveButton({ children, choosen, setDateChosen, findActivies, id }) {
  const select = choosen === id;
  return (
    <ButtonWrapper choosen={choosen} select={select} onClick={() => {
      setDateChosen(id);
      findActivies(id);
    }}>{children}</ButtonWrapper>
  );
}
