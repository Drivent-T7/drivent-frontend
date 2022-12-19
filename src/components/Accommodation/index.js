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
  const { hotels } = useHotel();
  const { getRooms } = useRoom();
  const { getBooking } = useBooking();
  const { saveBooking } = useSaveBooking();
  const { updateBooking } = useUpdateBooking();
  const [accommodation, setAccommodation] = useState({});
  const [hotelChosen, setHotelChosen] = useState(0);
  const [hasBooking, setHasBooking] = useState(false);
  const [dataBooking, setDataBooking] = useState({});
  const [hotelRooms, setHotelRooms] = useState([]);
  const [changeRoom, setChangeRoom] = useState([]);
  const [changeAccommodation, setChangeAccommodation] = useState({});

  function isValidTicket(ticket) {
    return ticket && ticket.status === 'PAID' && !ticket.TicketType.isRemote && ticket.TicketType.includesHotel;
  }

  useEffect(async() => {
    hasHotelBooking();
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
      setHotelRooms([]);
      setChangeRoom([]);
      setChangeAccommodation({});
      setAccommodation({});
      hasHotelBooking();
      toast('Quarto reservado com sucesso!');
    } catch (err) {
      toast('Não foi possível reservar quarto!');
    }
  }

  async function updateAccommodation() {
    try {
      await updateBooking(changeAccommodation, dataBooking.bookingId);
      hasHotelBooking();
      setChangeRoom([]);
      setChangeAccommodation({});
      toast('Reserva do quarto trocada com sucesso!');
    } catch (err) {
      toast('Não foi possível fazer a troca para esse quarto!');
    }
  }

  async function hasHotelBooking() {
    try {
      const response = await getBooking();
      setDataBooking(response);
      setHasBooking(true);
    } catch (error) {
      setHasBooking(false);
    }
  }

  async function showRoom(hotelId) {
    try {
      const response = await getRooms(hotelId);
      setChangeRoom(response.Rooms);
    } catch (error) {
      toast('Não foi possível buscar os quartos desse hotel!');
    }
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>

      {isValidTicket(ticket) && hasBooking ? 
        (
          <>
            <SectionWrapper>
              <h2>Você já escolheu seu quarto:</h2>
              <HotelReserved 
                name={dataBooking.hotel.name} 
                image={dataBooking.hotel.image} 
                nameRoom={dataBooking.room.name}
                roomCapacity={dataBooking.room.capacity}
                booking={dataBooking.room.bookeds}
              />
              <ReserveButton onClick={() => showRoom(dataBooking.hotel.id)}>TROCAR DE QUARTO</ReserveButton>
            </SectionWrapper>
            
            {isValidTicket(ticket) && hotels && hasBooking && changeRoom.length > 0 && (
              <SectionWrapper>
                <h2>Tudo bem! Escolha o quarto que você deseja mudar:</h2>
    
                <div>
                  {changeRoom.map((room, index) => (
                    <Rooms key={index} {...room} accommodation={changeAccommodation} setAccommodation={setChangeAccommodation} roomReserved={dataBooking.room.id}/>
                  ))}
                </div>
              </SectionWrapper>
            )}
            {isValidTicket(ticket) && hotels && hasBooking && changeAccommodation.roomId && (
              <ReserveButton onClick={updateAccommodation}>CONFIRMAR ESCOLHA</ReserveButton>
            )}
          </>
        ) 
        
        : 
        
        isValidTicket(ticket) && hotels && (
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
