import { useState } from 'react';
import styled from 'styled-components';
import { Content } from './Content';
import { Vacancy } from './Vacancy';

export function Activities({ localData }) {
  const [activitySelected, setActivitySelected] = useState();

  return (
    <Container>
      {localData.Activity.map((activity, index) => {
        const startsAt = new Date(activity.startsAt).toLocaleTimeString('pt-BR');
        const endsAt = new Date(activity.endsAt).toLocaleTimeString('pt-BR');
        const duration = new Date(activity.endsAt).getHours() - new Date(activity.startsAt).getHours();

        const bookings = activity.ActivityBooking.length;
        const availableVacancies = 2 - bookings;

        let selectedStyle = {};
        if (activitySelected === activity.id && availableVacancies > 0) {
          selectedStyle = { background: '#D0FFDB' };
        }

        return (
          <Activity
            key={index}
            style={{ ...selectedStyle, height: `${duration * 80}px` }}
            onClick={() => {
              if (availableVacancies > 0) {
                setActivitySelected(() => activity.id);
              }
              if (activitySelected === activity.id) {
                setActivitySelected(() => 0);
              }
            }}
          >
            <Content name={activity.name} startsAt={startsAt} endsAt={endsAt} />

            <Vacancy activity={activity} activitySelected={activitySelected} availableVacancies={availableVacancies} />
          </Activity>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  & {
    display: flex;
    flex-direction: column;

    border: 1px solid #d7d7d7;

    padding: 10px;

    gap: 10px;

    overflow: auto;
  }
`;

const Activity = styled.div`
  & {
    display: flex;

    background: #f1f1f1;
    border-radius: 5px;
    padding: 10px;

    justify-content: space-between;

    min-height: 80px;
  }

  &:hover {
    cursor: pointer;
  }
`;
