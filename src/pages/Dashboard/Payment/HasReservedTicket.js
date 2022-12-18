import styled from 'styled-components';
import CardSection from './CardSection';
import usePayment from '../../../hooks/api/usePayment';
import { AiFillCheckCircle } from 'react-icons/ai';
import { Container, SubTitle, Title } from './styles/CommomStyle';

export default function HasReservedTicket({ ticket, getTicket }) {
  const { getPayment } = usePayment();
  const ticketTypeData = ticket.TicketType;
  const converterToGetPriceWithoutCents = 100;

  return (
    <Container>
      <Title>Ingresso e Pagamento</Title>
      <SubTitle>Ingresso Escolhido</SubTitle>
      <TicketCard>
        <TicketName>{ticketTypeData.name}</TicketName>
        <TicketPrice>R$ {ticketTypeData.price / converterToGetPriceWithoutCents}</TicketPrice>
      </TicketCard>

      <SubTitle>Pagamento</SubTitle>
      {ticket.status === 'PAID' ? (
        <ConfirmedPayment>
          <AiFillCheckCircle size="50px" color="green" />
          <TextWrapped>
            <h1>Pagamento confirmado!</h1>
            <p>Prossiga para escolha de hospedagem e atividades</p>
          </TextWrapped>
        </ConfirmedPayment>
      ) : (
        <>
          <CardSection getPayment={getPayment} getTicket={getTicket} ticketId={ticket.id} />
        </>
      )}
    </Container>
  );
}

const TicketCard = styled.div`
  & {
    width: 290px;
    height: 108px;
    background: #ffeed2;
    border-radius: 20px;

    display: flex;
    margin-top: 17px;
    margin-bottom: 30px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const TicketName = styled.div`
  & {
    font-size: 16px;
    line-height: 19px;
    color: #454545;
    margin-bottom: 10px;
  }
`;

const TicketPrice = styled.div`
  & {
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #898989;
  }
`;

const ConfirmedPayment = styled.div`
  & {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
  }
`;

const TextWrapped = styled.div`
  & {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    line-height: 20px;
    font-weight: 400;
    color: #454545;

    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  h1 {
    font-weight: 700;
  }
`;
