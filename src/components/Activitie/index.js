import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import useTicket from '../../hooks/api/useTicket';
import useDateActivies from '../../hooks/api/useDateActivies';
import useActivies from '../../hooks/api/useActivies';

import { SectionWrapper } from '../Accommodation/SectionWrapper';
import { ReserveButton } from './ReserveButton';

export function Activie() {
  const { ticket } = useTicket();
  const { getActivies } = useDateActivies();
  const { getActiviesByDate } = useActivies();
  const [listDate, setListDate] = useState([]);
  const [dateChosen, setDateChosen] = useState(0);
  
  async function findActivies(dateId) {
    try {
      const response = await getActiviesByDate(dateId);
      setDateChosen(dateId);
      console.log(response);
    } catch (error) {
      toast('Não foi buscar as datas das atividades desse dia!');
    }
  }
  function isValidTicket(ticket) {
    return ticket && ticket.status === 'PAID' && !ticket.TicketType.isRemote;
  }

  async function getDatesActivies() {
    try {
      const response = await getActivies();
      let dayName = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
      let monName = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

      let listEventDate = [];

      for(let i = 0; i < response.length; i++) {
        let dateEvent = new Date(response[i].date);
        let dayActivie = dateEvent.getDay();
        let dayMouthActivie = dateEvent.getDate();
        let mouthActivie = dateEvent.getMonth();
        let day = `${dayName[dayActivie]}, ${dayMouthActivie}/${monName[mouthActivie]}`;
        let objetcDate = {
          id: response[i].id,
          date: day
        };

        listEventDate.push(objetcDate);
      }

      setListDate(listEventDate);
    } catch (error) {
      toast('Não foi buscar as datas das atividades!');
    }
  }

  useEffect(() => {
    getDatesActivies();
  }, []);
    
  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>

      {isValidTicket(ticket) ? (
        <SectionWrapper>
          <h2>Primeiro, filtre pelo dia do evento: </h2>
          {listDate.map((item, index) => (
            <ReserveButton 
              choosen={dateChosen} 
              setDateChosen={setDateChosen}
              key={item.id} 
              id={item.id} 
              findActivies={findActivies}>{item.date}</ReserveButton>
          ))}        
        </SectionWrapper>
      ) : <></>}  
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

