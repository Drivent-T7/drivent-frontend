import { HotelsWrapper } from './HotelsWrapper';

export default function Hotels({
  id,
  name,
  image,
  availableVacancies,
  capacity,
  isLast,
  hotelChosen,
  setHotelChosen,
}) {
  const choosen = hotelChosen === id;

  return (
    <HotelsWrapper isLast={isLast} choosen={choosen} onClick={() => (choosen ? '' : setHotelChosen(id))} avaible={true} >
      <img alt={name} src={image} />
      <h4>{name}</h4>

      <HotelsWrapper.Info>
        <span>
          <b>Tipos de acomodação: </b>
          <br />
          {capacity}
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
