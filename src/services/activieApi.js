import api from './api';

export async function getDates(token) {
  const response = await api.get('/activie', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getActiviesByDateId(token, dateId) {
  const response = await api.get(`/activie/${dateId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
}
