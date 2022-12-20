import styled from 'styled-components';
import ClickBox from './ClickBox';

export default function Options({ data }) {
  return (
    <Container>
      {data.options.map((optionData, index) => {
        return <ClickBox type={data.type} optionData={{ ...optionData }} key={index}></ClickBox>;
      })}
    </Container>
  );
}

export const Container = styled.div`
  & {
    display: flex;
    gap: 22px;

    margin-bottom: 30px;
  }
`;
