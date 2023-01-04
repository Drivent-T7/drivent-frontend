import { HotelsWrapper } from './HotelsWrapper';

export default function Hotels({ id, name, image, availableVacancies, capacity, accommodation, setAccommodation }) {
  const choosen = accommodation.hotelId === id;

  return (
    <HotelsWrapper
      choosen={choosen}
      onClick={() => (choosen ? '' : setAccommodation((prev) => ({ ...prev, hotelId: id })))}
    >
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
