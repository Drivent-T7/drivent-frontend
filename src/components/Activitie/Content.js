import styled from 'styled-components';

export function Content({ name, startsAt, endsAt }) {
  return (
    <Container>
      <Name>{name}</Name>
      <DateTime>
        {startsAt} - {endsAt}
      </DateTime>
    </Container>
  );
}

const Container = styled.div`
  & {
    display: flex;
    flex-direction: column;
  }
`;

const Name = styled.div`
  & {
    display: flex;
    align-items: center;

    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;

    color: #343434;
  }
`;

const DateTime = styled.div`
  & {
    display: flex;
    align-items: center;

    margin-top: 10px;

    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;

    color: #343434;
  }
`;
