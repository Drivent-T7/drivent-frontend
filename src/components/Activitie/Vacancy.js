import styled from 'styled-components';
import { BiCheckCircle, BiLogIn } from 'react-icons/bi';
import { RiCloseCircleLine } from 'react-icons/ri';

export function Vacancy({ bookedActivities, activity, availableVacancies }) {
  if (bookedActivities?.find((e) => e === activity.id)) {
    return (
      <Container>
        <BiCheckCircle color="#078632" size={'25px'} />
        <Text style={{ color: '#078632' }}>Inscrito</Text>
      </Container>
    );
  }

  return (
    <Container>
      {availableVacancies > 0 ? (
        <>
          <BiLogIn color="#078632" size={'25px'} />
          <Text>{availableVacancies} vagas</Text>
        </>
      ) : (
        <>
          <RiCloseCircleLine color="#CC6666" size={'25px'} />
          <Text style={{ color: '#CC6666' }}>Esgotado</Text>
        </>
      )}
    </Container>
  );
}
const Container = styled.div`
  & {
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    border-left: 1px solid #d7d7d7;

    width: 60px;
  }
`;

const Text = styled.div`
  & {
    display: flex;

    align-items: center;
    justify-content: center;
    text-align: center;

    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 11px;

    color: #078632;
  }
`;
