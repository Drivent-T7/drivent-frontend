import { useContext } from 'react';
import styled from 'styled-components';
import PaymentContext from '../../contexts/PaymentContext';
import useSaveTicket from '../../hooks/api/useSaveTicket';
import Options from './Options';

export default function NoTicket({ getTicket, ticketTypes }) {
  const { paymentOptionsSelected } = useContext(PaymentContext);
  const { saveTicket } = useSaveTicket();

  let onlineTicket, presentialTicket;

  if (ticketTypes) {
    const online = ticketTypes.filter((obj) => obj.isRemote)[0];
    const presentialWithoutHotel = ticketTypes.filter((obj) => !obj.includesHotel && !obj.isRemote)[0];
    const presentialWithHotel = ticketTypes.filter((obj) => obj.includesHotel)[0];

    onlineTicket = {
      id: online.id,
      name: online.name,
      price: online.price / 100,
    };

    presentialTicket = {
      id: 0,
      name: presentialWithHotel.name.split(' + ')[0],
      price: presentialWithoutHotel.price / 100,
      accommodations: [
        {
          id: presentialWithoutHotel.id,
          name: presentialWithoutHotel.name.split(' + ')[1],
          price: 0,
        },
        {
          id: presentialWithHotel.id,
          name: presentialWithHotel.name.split(' + ')[1],
          price: (presentialWithHotel.price - presentialWithoutHotel.price) / 100,
        },
      ],
    };
  }

  let ticketTypeId;
  ticketTypeId = paymentOptionsSelected?.ticket?.id >= 0 ? paymentOptionsSelected.ticket.id : ticketTypeId;
  ticketTypeId =
    paymentOptionsSelected?.ticket?.id === 0 && paymentOptionsSelected?.accommodation?.id
      ? paymentOptionsSelected.accommodation.id
      : ticketTypeId;

  function sumPrices() {
    let sum = 0;
    for (let key in paymentOptionsSelected) {
      sum += paymentOptionsSelected[key].price;
    }
    return sum;
  }

  const ticketData = {
    type: 'ticket',
    options: [presentialTicket, onlineTicket],
  };

  const accommodationData = {
    type: 'accommodation',
    options: presentialTicket.accommodations,
  };

  return (
    <Container>
      <Title>Ingresso e pagamento</Title>
      <SubTitle>Primeiro, escolha sua modalidade de ingresso</SubTitle>
      <Options data={ticketData} />

      {paymentOptionsSelected?.ticket?.id === 0 ? (
        <>
          <SubTitle>Ótimo! Agora escolha sua modalidade de hospedagem</SubTitle>
          <Options data={accommodationData} />
        </>
      ) : (
        <></>
      )}

      {ticketTypeId ? (
        <>
          <SubTitle>Fechado! O total ficou em R$ {sumPrices()}. Agora é só confirmar:</SubTitle>
          <SubmitButton
            onClick={async() => {
              await saveTicket({ ticketTypeId });
              await getTicket();
            }}
          >
            RESERVAR INGRESSO
          </SubmitButton>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
}

export const Container = styled.div`
  & {
    font-family: 'Arial';
    font-style: normal;
    font-weight: 400;
  }
`;

export const Title = styled.div`
  & {
    font-size: 34px;
    line-height: 40px;

    margin-bottom: 30px;
  }
`;

export const SubTitle = styled.div`
  & {
    font-size: 20px;
    line-height: 23px;

    color: #8e8e8e;

    margin-bottom: 10px;
  }
`;

export const SubmitButton = styled.button`
  & {
    border: none;

    width: fit-content;
    height: 40px;

    font-size: 14px;
    line-height: 16px;
    text-align: center;

    background: #e0e0e0;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
  }

  &:hover {
    cursor: pointer;
  }
`;
