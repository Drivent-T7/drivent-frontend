import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { UnathorizedMsg } from './UnathorizedMsg';

import useTicket from '../../hooks/api/useTicket';

export default function HotelForm() {
  const { getTicket } = useTicket();
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
        return;
      }
      if(response.TicketType.isRemote || !response.TicketType.includesHotel) {
        setHasTicketValid(true);
        setHasHotel(false);
        return;
      }
      setHasTicketValid(true);
      setHasHotel(true);
    } catch (error) {
      setHasTicketValid(false);
    }
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {hasTicketValid ? 
        hasHotel 
          ?
          <Container>
            <UnathorizedMsg variant="body1" align="center">Tudo na boa</UnathorizedMsg>
          </Container>
          :
          <Container>
            <UnathorizedMsg variant="body1" align="center">Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades</UnathorizedMsg>
          </Container>
        : 
        <Container>
          <UnathorizedMsg variant="body1" align="center">Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem</UnathorizedMsg>
        </Container>
      }
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
  @media (max-width: 600px) {
    > div {
      height: 60vh;
    }
  }
`;
