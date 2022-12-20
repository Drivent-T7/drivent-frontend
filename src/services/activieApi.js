import api from './api';

export async function getDates(token) {
  const response = await api.get('/activity', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getActiviesByDateId(token, dateId) {
  const response = await api.get(`/activity/${dateId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
}
