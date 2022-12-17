import { useContext } from 'react';
import styled from 'styled-components';
import PaymentContext from '../../../contexts/PaymentContext';
import useSaveTicket from '../../../hooks/api/useSaveTicket';
import Options from './Options';

export default function NoTicket({ getTicket }) {
  const { paymentOptionsSelected } = useContext(PaymentContext);
  const { saveTicket } = useSaveTicket();

  let ticketTypeId;
  ticketTypeId = paymentOptionsSelected?.ticket?.id === 1 ? 1 : ticketTypeId; //Online
  ticketTypeId =
    paymentOptionsSelected?.ticket?.id === 0 && paymentOptionsSelected?.accommodation?.id === 1 ? 2 : ticketTypeId; //Presential with Hotel
  ticketTypeId =
    paymentOptionsSelected?.ticket?.id === 0 && paymentOptionsSelected?.accommodation?.id === 0 ? 3 : ticketTypeId; //Presential without Hotel

  function sumPrices() {
    let sum = 0;
    for (let key in paymentOptionsSelected) {
      sum += paymentOptionsSelected[key].price;
    }
    return sum;
  }

  const ticketData = {
    type: 'ticket',
    options: [
      { name: 'Presencial', price: 250 },
      { name: 'Online', price: 100 },
    ],
  };

  const accommodationData = {
    type: 'accommodation',
    options: [
      { name: 'Sem Hotel', price: 0 },
      { name: 'Com Hotel', price: 350 },
    ],
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
