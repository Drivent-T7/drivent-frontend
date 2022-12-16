import { Typography } from '@material-ui/core';
import styled from 'styled-components';

import useHotel from '../../hooks/api/useHotel';
import useTicket from '../../hooks/api/useTicket';
import Hotels from './Hotels';

export default function Accommodation() {
  const { ticket } = useTicket();
  const { hotels } = useHotel();

  function isValidTicket(ticket) {
    return ticket && ticket.status === 'PAID' && !ticket.TicketType.isRemote && ticket.TicketType.includesHotel;
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>

      {isValidTicket(ticket) && hotels && <Hotels hotels={hotels} />}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
