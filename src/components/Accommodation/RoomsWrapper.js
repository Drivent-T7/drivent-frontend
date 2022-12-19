import styled from 'styled-components';

export function RoomsWrapper({ children, ...props }) {
  return <StyledRoomsWrapper {...props}>{children}</StyledRoomsWrapper>;
}

const StyledRoomsWrapper = styled.button`
  min-width: 190px;
  width: auto;
  max-width: 200px;
  height: 45px;
  margin-bottom: 20px;
  margin-right: 20px;
  padding: 0.7em;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #cecece;
  background-color: ${(props) => (props.select ? '#FFEED2' : '#ffffff')};
  color: #000000;
  font-weight: 700;
  cursor: pointer;

  :hover {
    filter: brightness(0.9);
  }

  :disabled {
    background-color: #e9e9e9;
    filter: brightness(0.9);
    color: #8c8c8c;
    cursor: initial;

    > h4 {
      color: #9d9d9d;
    }
  }

  > h4 {
    font-size: 1.4em;
    line-height: 2em;
    color: #454545;
    margin-right: 1.2em;
    max-width: 110px;
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  > div {
    font-size: 1.8em;
    display: flex;
    align-items: center;
  }
`;
