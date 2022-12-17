import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useSaveBooking() {
  const token = useToken();

  const {
    data: booking,
    loading: bookingLoading,
    error: bookingError,
    act: saveBooking,
  } = useAsync((data) => bookingApi.save(token, data), false);

  return {
    booking,
    bookingLoading,
    bookingError,
    saveBooking,
  };
}
