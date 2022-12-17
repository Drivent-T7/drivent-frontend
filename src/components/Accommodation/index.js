import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import useTicket from '../../hooks/api/useTicket';
import useHotel from '../../hooks/api/useHotel';
import useRoom from '../../hooks/api/useRoom';
import useSaveBooking from '../../hooks/api/useSaveBooking';
import { SectionWrapper } from './SectionWrapper';
import Hotels from './Hotels';
import Rooms from './Rooms';

export default function Accommodation() {
  const { ticket } = useTicket();
  const { hotels } = useHotel();
  const { getRooms } = useRoom();
  const { saveBooking } = useSaveBooking();
  const [accommodation, setAccommodation] = useState({});
  const [hotelChosen, setHotelChosen] = useState(0);
  const [hotelRooms, setHotelRooms] = useState([]);

  function isValidTicket(ticket) {
    return ticket && ticket.status === 'PAID' && !ticket.TicketType.isRemote && ticket.TicketType.includesHotel;
  }

  useEffect(async() => {
    if (hotelChosen) {
      try {
        const rooms = await getRooms(hotelChosen);
        setHotelRooms(rooms.Rooms);
      } catch (err) {
        toast('Não foi possível buscar os quartos desse hotel!');
      }
    }
  }, [hotelChosen]);

  async function reserveAccommodation() {
    try {
      await saveBooking(accommodation);
      toast('Quarto reservado com sucesso!');
      setAccommodation({});
    } catch (err) {
      toast('Não foi possível reservar quarto!');
    }
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>

      {isValidTicket(ticket) && hotels && (
        <SectionWrapper>
          <h2>Primeiro, escolha seu hotel</h2>

          <div>
            {hotels.map((hotel, index) => (
              <Hotels
                key={index}
                {...hotel}
                isLast={index === hotels.length - 1}
                hotelChosen={hotelChosen}
                setHotelChosen={setHotelChosen}
              />
            ))}
          </div>
        </SectionWrapper>
      )}

      {isValidTicket(ticket) && hotels && hotelRooms.length > 0 && (
        <SectionWrapper>
          <h2>Ótima pedida! Agora escolha seu quarto:</h2>

          <div>
            {hotelRooms.map((room, index) => (
              <Rooms key={index} {...room} accommodation={accommodation} setAccommodation={setAccommodation} />
            ))}
          </div>
        </SectionWrapper>
      )}

      {isValidTicket(ticket) && hotels && accommodation.roomId && (
        <ReserveButton onClick={reserveAccommodation}>RESERVAR QUARTO</ReserveButton>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const ReserveButton = styled.button`
  width: 182px;
  height: 37px;
  border: none;
  border-radius: 4px;
  background-color: #e0e0e0;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0, 0.25);
  font-size: 14px;
  font-weight: 400;
  color: #000000;
  cursor: pointer;

  :hover {
    filter: brightness(0.9);
  }
`;
