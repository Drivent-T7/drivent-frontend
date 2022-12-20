import api from './api';

export async function getDates(token) {
  const response = await api.get('/activy', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getActiviesByDateId(token, dateId) {
  const response = await api.get(`/activy/${dateId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
}
