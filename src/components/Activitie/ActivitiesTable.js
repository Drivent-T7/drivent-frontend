import styled from 'styled-components';
import { Activities } from './Activities';

export function ActivitiesTable({ activitiesData }) {
  console.log(activitiesData);
  return (
    <Container>
      <Headers>
        {activitiesData.map((local, index) => {
          return <div key={index}>{local.name}</div>;
        })}
      </Headers>

      <Table>
        {activitiesData.map((local, index) => {
          return <Activities key={index} localData={local} />;
        })}
      </Table>
    </Container>
  );
}

const Container = styled.div`
  & {
    display: flex;
  }
`;

const Table = styled.div`
  & {
    display: grid;

    grid-auto-flow: column;

    grid-template-columns: 1fr 1fr 1fr;

    margin-top: 10px;

    width: 100%;
    height: 390px;
  }
`;

const Headers = styled.div`
  & {
    display: flex;

    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 20px;

    text-align: center;

    color: #7b7b7b;

    width: 100%;

    justify-content: space-around;

    margin-top: 30px;
  }
`;
