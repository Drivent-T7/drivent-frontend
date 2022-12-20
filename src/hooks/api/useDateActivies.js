import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activiesApi from '../../services/activieApi';

export default function useDateActivies() {
  const token = useToken();

  const {
    data: activies,
    loading: activiesLoading,
    error: activiesError,
    act: getActivies,
  } = useAsync(() => activiesApi.getDates(token));

  return {
    activies,
    activiesLoading,
    activiesError,
    getActivies,
  };
}
