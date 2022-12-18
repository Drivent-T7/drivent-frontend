import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export default function useSavePayment() {
  const token = useToken();

  const {
    loading: savePaymentLoading,
    error: savePaymentError,
    act: savePayment,
  } = useAsync((data) => paymentApi.save(data, token), false);

  return {
    savePaymentLoading,
    savePaymentError,
    savePayment,
  };
}
