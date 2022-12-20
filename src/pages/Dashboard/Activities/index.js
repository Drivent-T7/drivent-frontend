import styled from 'styled-components';
import { Activie } from '../../../components/Activitie';
import useTicket from '../../../hooks/api/useTicket';

export default function Activities() {
  const { ticket } = useTicket();

  if (ticket?.status !== 'PAID') {
    return (
      <Container>
        <Title>Atividades</Title>
        <Message>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades.</Message>
      </Container>
    );
  }

  if (ticket.ticketTypeId === 1) {
    return (
      <Container>
        <Title>Atividades</Title>
        <Message>Sua modalidade de ingresso não necessita escolher atividade.</Message>
      </Container>
    );
  }

  return <Activie />;
}

const Container = styled.div`
  & {
    display: flex;
    flex-direction: column;

    height: 100%;
  }
`;

const Title = styled.div`
  & {
    font-size: 34px;
    line-height: 40px;

    margin-bottom: 30px;
  }
`;

const Message = styled.div`
  & {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100%;

    margin-bottom: 30px;
  }
`;
