import { HotelsWrapper } from './HotelsWrapper';
import { SectionWrapper } from './SectionWrapper';

export default function Hotels({ hotels }) {
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
    <SectionWrapper>
      <h2>Primeiro, escolha seu hotel</h2>

      <div>
        {hotels.map((hotel, index) => (
          <HotelsWrapper key={index} isLast={index === hotels.length - 1}>
            <img alt={hotel.name} src={hotel.image} />
            <h4>{hotel.name}</h4>

            <HotelsWrapper.Info>
              <span>
                <b>Tipos de acomodação: </b>
                <br />
                {getRoomCapacity(hotel)}
              </span>

              <span>
                <b>Vagas disponíveis: </b>
                <br />
                {hotel.availableVacancies}
              </span>
            </HotelsWrapper.Info>
          </HotelsWrapper>
        ))}
      </div>
    </SectionWrapper>
  );
}
