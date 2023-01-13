import styled from 'styled-components';
import { Activie } from '../../../components/Activitie';
import Splash from '../../../components/Splash';
import useTicket from '../../../hooks/api/useTicket';

export default function Activities() {
  const { ticket, ticketLoading } = useTicket();

  if(ticketLoading) {
    return <Splash loading />;
  }
 
  if (ticket?.status !== 'PAID') {
    return (
      <Container>
        <Title>Atividades</Title>
        <Message><p>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades.</p></Message>
      </Container>
    );
  }

  if (ticket.TicketType.isRemote) {
    return (
      <Container>
        <Title>Atividades</Title>
        <Message><p>Sua modalidade de ingresso não necessita escolher atividade.</p></Message>
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
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  p {
    width: 50%;

    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    line-height: 23px;
    color: #8e8e8e;
    text-align: center;
  }
`;
