import styled from 'styled-components';

export function ButtonWrapper({ children, ...props }) {
  return <ReserveButtonStyle {...props}>{children}</ReserveButtonStyle>;
}

const ReserveButtonStyle = styled.button`
  width: 182px;
  height: 37px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => (props.choosen ? '#ffeed2' : '#ebebeb')};
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0, 0.25);
  font-size: 14px;
  font-weight: 400;
  color: #000000;
  cursor: pointer;
  margin-right: 3px;
  margin-bottom: 3px;
  :hover {
    filter: brightness(0.9);
  }
`;
