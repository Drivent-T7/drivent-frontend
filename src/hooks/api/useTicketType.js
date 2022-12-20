import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketTypesApi from '../../services/ticketTypeApi';

export default function useTicketTypes() {
  const token = useToken();

  const {
    data: ticketTypes,
    loading: ticketTypesLoading,
    error: ticketTypesError,
    act: getTicketTypes,
  } = useAsync(() => ticketTypesApi.get(token));

  return {
    ticketTypes,
    ticketTypesLoading,
    ticketTypesError,
    getTicketTypes,
  };
}
