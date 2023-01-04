import api from './api';

export async function signIn(email, password) {
  const response = await api.post('/auth/sign-in', { email, password });
  return response.data;
}

export async function signInMethod(email, idSession) {
  const response = await api.post('/auth/sign-in/method', { email, idSession });
  return response.data;
}

//
