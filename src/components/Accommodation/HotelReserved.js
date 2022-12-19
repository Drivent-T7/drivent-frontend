import { useState, useEffect } from 'react';
import { HotelsWrapper } from './HotelsWrapper';

export default function HotelReserved({
  name,
  image,
  nameRoom,
  roomCapacity,
  booking
}) {
  const [typeRoom, setTypeRoom] = useState('');
  const [qtdPeople, setQtdPeople] = useState('');

  function capacityRoom(qtd) {
    if(qtd === 1) {
      setTypeRoom('Single');
    }
    if(qtd === 2) {
      setTypeRoom('Double');
    }
    if(qtd === 3) {
      setTypeRoom('Triple');
    }
  }
  
  function peopleInTheRoom(qtd) {
    if(qtd === 1) {
      setQtdPeople('Somente você');
    }
    if(qtd === 2) {
      setQtdPeople('Você e mais 1 pessoa');
    }
    if(qtd === 3) {
      setQtdPeople('Você e mais 2 pessoas');
    }
  }

  useEffect(() => {
    capacityRoom(roomCapacity);
    peopleInTheRoom(booking);
  }, []);

  return (
    <HotelsWrapper choosen={true} >
      <img alt={name} src={image} />
      <h4>{name}</h4>

      <HotelsWrapper.Info>
        <span>
          <b>Quarto reservado: </b>
          <br />
          <p>{nameRoom} {typeRoom}</p>
        </span>

        <span>
          <b>Pessoas no seu quarto: </b>
          <br />
          <p>{qtdPeople}</p>
        </span>
      </HotelsWrapper.Info>
    </HotelsWrapper>
  );
}
