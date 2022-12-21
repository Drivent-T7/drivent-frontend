import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activityBookingApi from '../../services/activityBookingApi';

export default function useSaveActivityBooking() {
  const token = useToken();

  const {
    data: activityBooking,
    loading: activityBookingLoading,
    error: activityBookingError,
    act: saveActivityBooking,
  } = useAsync((data) => activityBookingApi.save(token, data), false);

  return { 
    activityBooking,
    activityBookingLoading,
    activityBookingError,
    saveActivityBooking
  };
}
