import { BsPerson, BsPersonFill } from 'react-icons/bs';

import { RoomsWrapper } from './RoomsWrapper';

export default function Rooms({
  id,
  name,
  capacity,
  bookeds,
  accommodation,
  setAccommodation,
  roomReserved,
  changeAccommodation,
  setChangeAccommodation,
  isChange,
  roomBooked,
}) {
  const select = accommodation.roomId === id || changeAccommodation.roomId === id;
  const vacancies = select ? capacity - bookeds - 1 : capacity - bookeds;
  const capacityArray = Array(vacancies).fill(1);
  const bookedsArray = Array(bookeds).fill(1);
  const disabled = capacity === bookeds || id === roomReserved || id === roomBooked;

  function chooseRoom() {
    if (isChange) {
      setChangeAccommodation({ roomId: id });
      return;
    }
    setAccommodation({ roomId: id });
  }

  return (
    <RoomsWrapper disabled={disabled} select={select} onClick={chooseRoom}>
      <h4>{name}</h4>

      <div>
        {capacity === bookeds && bookedsArray.map(() => <BsPersonFill />)}
        {capacity > bookeds && capacityArray.map(() => <BsPerson />)}
        {select && <BsPersonFill color="#FF4791" />}
        {capacity > bookeds && bookedsArray.map(() => <BsPersonFill />)}
      </div>
    </RoomsWrapper>
  );
}
