import { Typography } from '@material-ui/core';
import styled from 'styled-components';

import useHotel from '../../hooks/api/useHotel';
import useTicket from '../../hooks/api/useTicket';

import { HotelsWrapper } from './HotelsWrapper';
import { SectionWrapper } from './SectionWrapper';

export default function Accommodation() {
  const { ticket } = useTicket();
  const { hotels } = useHotel();

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>

      {isValidTicket(ticket) && (
        <SectionWrapper>
          <h2>Primeiro, escolha seu hotel</h2>

          <div>
            {hotels ? (
              hotels.map((hotel, index) => (
                <HotelsWrapper isLast={index === hotels.length - 1}>
                  <img alt={hotel.name} src={hotel.image} />
                  <h4>{hotel.name}</h4>
                </HotelsWrapper>
              ))
            ) : (
              <></>
            )}
          </div>
        </SectionWrapper>
      )}
    </>
  );
}

function isValidTicket(ticket) {
  return ticket && ticket.status === 'PAID' && !ticket.TicketType.isRemote && ticket.TicketType.includesHotel;
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
