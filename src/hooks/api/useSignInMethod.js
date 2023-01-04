import useAsync from '../useAsync';

import * as authApi from '../../services/authApi';

export default function useSignInMethod() {
  const {
    loading: loadingsignInMethod,
    error: signInMethodError,
    act: signInMethod
  } = useAsync(authApi.signInMethod, false);

  return {
    loadingsignInMethod,
    signInMethodError,
    signInMethod
  };
}
