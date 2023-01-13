import { useEffect, useState } from 'react';
import styled from 'styled-components';

import useTicket from '../../hooks/api/useTicket';

import Accommodation from '../Accommodation';
import Splash from '../Splash';

export default function HotelForm() {
  const { getTicket } = useTicket();
  const [isLoading, setIsLoading] = useState(true);
  const [hasTicketValid, setHasTicketValid] = useState(false);
  const [hasHotel, setHasHotel] = useState(false);

  useEffect(() => {
    returnTicketUser();
  }, []);
  
  async function returnTicketUser() {
    try {
      const response = await getTicket();
      if(response.status === 'RESERVED') {
        setHasTicketValid(false);
        setIsLoading(false);
        return;
      }
      if(response.TicketType.isRemote || !response.TicketType.includesHotel) {
        setHasTicketValid(true);
        setHasHotel(false);
        setIsLoading(false);
        return;
      }
      setHasTicketValid(true);
      setHasHotel(true);
      setIsLoading(false);
    } catch (error) {
      setHasTicketValid(false);
      setIsLoading(false);
    }
  }

  return (
    <>
      { isLoading ? <Splash loading /> : hasTicketValid ? 
        hasHotel 
          ?
          <Accommodation />
          :
          <>
            <Title>Escolha de hotel e quarto</Title>
            <AlertWrapper>
              <p>Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades</p>
            </AlertWrapper>
          </>
        : 
        <>
          <Title>Escolha de hotel e quarto</Title>
          <AlertWrapper>
            <p>Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</p>
          </AlertWrapper>
        </>
      }
    </>
  );
}

const Title = styled.div`
  & {
    font-size: 34px;
    line-height: 40px;

    margin-bottom: 30px;
  }
`;

const AlertWrapper = styled.div`
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
