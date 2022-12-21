import api from './api';

export async function getActivityBookings(token) {
  const response = await api.get('/activitybooking', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function save(token, body) {
  const response = await api.post('/activitybooking', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
