import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import useTicket from '../../hooks/api/useTicket';
import useDateActivies from '../../hooks/api/useDateActivies';
import useActivies from '../../hooks/api/useActivies';

import { SectionWrapper } from '../Accommodation/SectionWrapper';

export function Activie() {
  const { ticket } = useTicket();
  const { getActivies } = useDateActivies();
  const { getActiviesByDate } = useActivies();
  const [listDate, setListDate] = useState([]);

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

  async function findActivies(dateId) {
    try {
      const response = await getActiviesByDate(dateId);
      console.log(response);
    } catch (error) {
      toast('Não foi buscar as datas das atividades desse dia!');
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
          {listDate.map((item, index) => (
            <ReserveButton key={index} onClick={() => findActivies(item.id)}>{item.date}</ReserveButton>
          ))}        
        </SectionWrapper>
      ) : <></>}  
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
  margin-right: 3px;
  margin-bottom: 3px;
  :hover {
    filter: brightness(0.9);
  }
`;
