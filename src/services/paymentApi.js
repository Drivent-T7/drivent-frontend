import api from './api';

//Temporario

export async function getTicketInformation(token) {
  const response = await api.get('/tickets', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

//Temporario

export async function getPaymentInformation(token, ticketId) {
  const response = await api.get(`/payments?ticketId=${ticketId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function savePayment(body, token) {
  const response = await api.post('/payments/process', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
