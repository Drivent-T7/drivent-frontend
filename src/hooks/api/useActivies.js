import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activiesApi from '../../services/activieApi';

export default function useActivies() {
  const token = useToken();

  const {
    data: activies,
    loading: activiesLoading,
    error: activiesError,
    act: getActiviesByDate,
  } = useAsync((dateId) => activiesApi.getActiviesByDateId(token, dateId));

  return {
    activies,
    activiesLoading,
    activiesError,
    getActiviesByDate,
  };
}
