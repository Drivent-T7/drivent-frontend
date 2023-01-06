import { toast } from 'react-toastify';
import { Content } from './Content';
import { Vacancy } from './Vacancy';
import styled from 'styled-components';
import swal from '@sweetalert/with-react';
import useSaveActivityBooking from '../../hooks/api/useSaveActivityBooking';

export function Activities({ localData, activityBooking, getActivityBookings }) {
  const { saveActivityBooking } = useSaveActivityBooking();
  let bookedActivities;
  let bookedActivitiesTimes;
  if(activityBooking) {
    bookedActivities = activityBooking.map((obj) => obj.Activities.id);
    bookedActivitiesTimes = activityBooking.map((obj) => {
      return {
        startsAt: new Date(obj.Activities.startsAt),
        endsAt: new Date(obj.Activities.endsAt)
      };
    });
  }

  return (
    <Container>
      {localData.Activities.map((activity, index) => {
        const startsAt = new Date(activity.startsAt).toLocaleTimeString('pt-BR');
        const endsAt = new Date(activity.endsAt).toLocaleTimeString('pt-BR');
        const duration = new Date(activity.endsAt).getHours() - new Date(activity.startsAt).getHours();
        const bookings = activity.ActivityBooking?.length;
        const availableVacancies = activity.capacity - bookings;
        const bookedActivity = bookedActivities?.find((e) => e === activity.id);

        let selectedStyle = {};
        if (bookedActivity) {
          selectedStyle = { background: '#D0FFDB' };
        }

        return (
          <Activity
            key={index}
            style={{ ...selectedStyle, height: `${duration * 80}px` }}
            onClick={ async() => {
              if (availableVacancies > 0 && !bookedActivity) {
                const newActivityTime = {
                  startsAt: new Date(activity.startsAt),
                  endsAt: new Date(activity.endsAt)
                };
                if(hasConflict([...bookedActivitiesTimes], newActivityTime)) {
                  toast('Horários conflitantes! Escolha outra atividade!');
                } else {
                  swal({
                    title: `Deseja se inscrever na atividade: "${activity.name}"?`,
                    text: `${new Date(activity.startsAt).getDate()}/${new Date(activity.startsAt).getMonth() + 1} - ${startsAt} às ${endsAt}`,
                    icon: 'warning',
                    buttons: [true, 'Inscrever'],
                    content: (
                      <WarningMessage>
                        a inscrição não poderá ser desfeita!
                      </WarningMessage>                   
                    )
                  })
                    .then( async(confirm) => {
                      if (confirm) {                      
                        try {
                          await saveActivityBooking({ activityId: activity.id });
                          toast('Inscrição realizada com sucesso!');
                          await getActivityBookings();
                        } catch (error) {
                          toast('Não foi possível registrar a inscrição!');
                        }
                      }
                    });
                }
              };

              if(availableVacancies <= 0) {
                toast('Não há vagas nesta atividade!');
              };
            }}
          >
            <Content name={activity.name} startsAt={startsAt} endsAt={endsAt} />

            <Vacancy bookedActivities={bookedActivities} activity={activity} availableVacancies={availableVacancies} />
          </Activity>
        );
      })}
    </Container>
  );
}

export function hasConflict(bookedActivitiesTime, newActivityTime) { 
  for (const obj of bookedActivitiesTime) {
    if( (newActivityTime.startsAt >= obj.startsAt && newActivityTime.startsAt < obj.endsAt) || (newActivityTime.endsAt > bookedActivitiesTime.startsAt && newActivityTime.endsAt <= bookedActivitiesTime.endsAt) ) {
      return true;
    };
  }

  return false;
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

const WarningMessage = styled.div`
  font-style: oblique;
  font-variant: small-caps;
  height: 50px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
`;
