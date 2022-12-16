import { Typography } from '@material-ui/core';
import styled from 'styled-components';

import useHotel from '../../hooks/api/useHotel';
import useTicket from '../../hooks/api/useTicket';

import { HotelsWrapper } from './HotelsWrapper';
import { SectionWrapper } from './SectionWrapper';

export default function Accommodation() {
  const { ticket } = useTicket();
  const { hotels } = useHotel();

  function isValidTicket(ticket) {
    return ticket && ticket.status === 'PAID' && !ticket.TicketType.isRemote && ticket.TicketType.includesHotel;
  }

  function getRoomCapacity({ roomsCapacity }) {
    const capacity = {};

    roomsCapacity = roomsCapacity.filter((number) => {
      if (!capacity[number]) {
        capacity[number] = true;
        return true;
      }
      return false;
    });

    return roomsCapacity
      .sort()
      .join(', ')
      .replace(1, 'Single')
      .replace(2, 'Double')
      .replace(3, 'Triple')
      .replace(/,\s([^,]+)$/, ' e $1');
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>

      {isValidTicket(ticket) && (
        <SectionWrapper>
          <h2>Primeiro, escolha seu hotel</h2>

          <div>
            {hotels ? (
              hotels.map((hotel, index) => (
                <HotelsWrapper key={index} isLast={index === hotels.length - 1}>
                  <img alt={hotel.name} src={hotel.image} />
                  <h4>{hotel.name}</h4>

                  <span>
                    <b>Tipos de acomodação: </b>

                    <br />

                    {getRoomCapacity(hotel)}
                  </span>
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

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
