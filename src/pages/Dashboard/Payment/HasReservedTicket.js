import styled from 'styled-components';
import CardSection from './CardSection';
import usePayment from '../../../hooks/api/usePayment';
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
      {ticket.status === 'PAID' ? (
        <>PAGO</>
      ) : (
        <>
          <SubTitle>Pagamento</SubTitle>
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
