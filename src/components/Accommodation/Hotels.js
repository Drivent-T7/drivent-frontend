import { HotelsWrapper } from './HotelsWrapper';

export default function Hotels({
  id,
  name,
  image,
  availableVacancies,
  roomsCapacity,
  isLast,
  hotelChosen,
  setHotelChosen,
}) {
  const choosen = hotelChosen === id;

  function getRoomCapacity() {
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
    <HotelsWrapper isLast={isLast} choosen={choosen} onClick={() => (choosen ? '' : setHotelChosen(id))}>
      <img alt={name} src={image} />
      <h4>{name}</h4>

      <HotelsWrapper.Info>
        <span>
          <b>Tipos de acomodação: </b>
          <br />
          {getRoomCapacity()}
        </span>

        <span>
          <b>Vagas disponíveis: </b>
          <br />
          {availableVacancies}
        </span>
      </HotelsWrapper.Info>
    </HotelsWrapper>
  );
}
