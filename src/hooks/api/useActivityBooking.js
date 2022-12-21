import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activityBookingApi from '../../services/activityBookingApi';

export default function useActivityBooking() {
  const token = useToken();

  const {
    data: activityBooking,
    loading: activityBookingLoading,
    error: activityBookingError,
    act: getActivityBookings,
  } = useAsync(() => activityBookingApi.getActivityBookings(token));

  return {
    activityBooking,      
    activityBookingLoading,
    activityBookingError,
    getActivityBookings
  };
}
