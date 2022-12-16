import styled from 'styled-components';

export function HotelsWrapper({ children, isLast }) {
  return <StyledHotelsWrapper isLast={isLast}>{children}</StyledHotelsWrapper>;
}

const StyledHotelsWrapper = styled.div`
  width: 196px;
  height: 264px;
  margin-bottom: 20px;
  margin-right: ${(props) => (props.isLast ? '0' : '20px')};
  padding: 0.8em;
  border-radius: 10px;
  background-color: #ebebeb;
  cursor: pointer;

  &:hover {
    background-color: #ffeed2;
  }

  > img {
    width: 100%;
    height: 109px;
    object-fit: cover;
    border-radius: 5px;
  }

  > h4 {
    font-weight: 400;
    font-size: 1em;
    line-height: 2em;
    color: #343434;
  }
`;
