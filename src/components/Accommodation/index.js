import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import useTicket from '../../hooks/api/useTicket';
import useHotel from '../../hooks/api/useHotel';
import useRoom from '../../hooks/api/useRoom';
import useBooking from '../../hooks/api/useBooking';
import useSaveBooking from '../../hooks/api/useSaveBooking';
import useUpdateBooking from '../../hooks/api/useUpdateBooking';
import { SectionWrapper } from './SectionWrapper';

import Hotels from './Hotels';
import Rooms from './Rooms';
import HotelReserved from './HotelReserved';

export default function Accommodation() {
  const { ticket } = useTicket();
  const { getHotel } = useHotel();
  const { getRooms } = useRoom();
  const { getBooking } = useBooking();
  const { saveBooking } = useSaveBooking();
  const { updateBooking } = useUpdateBooking();
  const [accommodation, setAccommodation] = useState({});
  const [hotels, setHotels] = useState([]);
  const [hotelRooms, setHotelRooms] = useState([]);
  const [dataBooking, setDataBooking] = useState({});
  const [isChangingAccommodation, setIsChangingAccommodation] = useState(false);

  function isValidTicket(ticket) {
    return ticket && ticket.status === 'PAID' && !ticket.TicketType.isRemote && ticket.TicketType.includesHotel;
  }

  useEffect(() => {
    getHotelBooking();
    getHotelsList();
  }, []);

  useEffect(async() => {
    if (accommodation.hotelId) {
      try {
        const hotel = await getRooms(accommodation.hotelId);
        setHotelRooms(hotel.Rooms);
      } catch (err) {
        toast('Não foi possível buscar os quartos desse hotel!');
      }
    }
  }, [accommodation.hotelId]);

  async function getHotelsList() {
    try {
      const response = await getHotel();
      setHotels(response);
    } catch (error) {
      toast('Não foi possível buscar os hotéis!');
    }
  }

  async function getHotelBooking() {
    try {
      const response = await getBooking();
      setDataBooking(response);

      if (response.bookingId) {
        setIsChangingAccommodation(false);
      }
    } catch (error) {
      setIsChangingAccommodation(true);
    }
  }

  async function reserveAccommodation() {
    try {
      await saveBooking({ roomId: accommodation.roomId });
      setAccommodation({});
      getHotelBooking();
      toast('Quarto reservado com sucesso!');
    } catch (err) {
      toast('Não foi possível reservar quarto!');
    }
  }

  async function updateAccommodation() {
    try {
      await updateBooking({ roomId: accommodation.roomId }, dataBooking.bookingId);
      setAccommodation({});
      getHotelBooking();
      toast('Reserva do quarto trocada com sucesso!');
    } catch (err) {
      toast('Não foi possível fazer a troca para esse quarto!');
    }
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>

      {isValidTicket(ticket) && !isChangingAccommodation && dataBooking.bookingId && (
        <SectionWrapper>
          <h2>Você já escolheu seu quarto:</h2>
          <HotelReserved
            name={dataBooking.hotel.name}
            image={dataBooking.hotel.image}
            nameRoom={dataBooking.room.name}
            roomCapacity={dataBooking.room.capacity}
            booking={dataBooking.room.bookeds}
          />
          <ReserveButton onClick={() => setIsChangingAccommodation(true)}>TROCAR DE QUARTO</ReserveButton>
        </SectionWrapper>
      )}

      {isValidTicket(ticket) && isChangingAccommodation && hotels && (
        <SectionWrapper>
          <h2>Primeiro, escolha seu hotel</h2>

          <div>
            {hotels.map((hotel, index) => (
              <Hotels
                key={index}
                {...hotel}
                isLast={index === hotels.length - 1}
                accommodation={accommodation}
                setAccommodation={setAccommodation}
              />
            ))}
          </div>
        </SectionWrapper>
      )}

      {isValidTicket(ticket) && hotels && hotelRooms.length > 0 && isChangingAccommodation && (
        <SectionWrapper>
          <h2>Ótima pedida! Agora escolha seu quarto:</h2>

          <div>
            {hotelRooms.map((room, index) => (
              <Rooms
                key={index}
                {...room}
                accommodation={accommodation}
                setAccommodation={setAccommodation}
                roomBooked={dataBooking?.room?.id}
              />
            ))}
          </div>
        </SectionWrapper>
      )}

      {isValidTicket(ticket) && hotels && accommodation.roomId && (
        <ReserveButton onClick={dataBooking.bookingId ? updateAccommodation : reserveAccommodation}>
          RESERVAR QUARTO
        </ReserveButton>
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
