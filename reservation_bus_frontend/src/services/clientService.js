import { ENDPOINTS } from '../config/apiConfig';

async function handleResponse(response) {
  if (!response.ok) {
    let message = `Erreur HTTP ${response.status}`;
    try {
      const body = await response.json();
      if (body?.message) message = body.message;
    } catch {
      // pas de corps JSON
    }
    throw new Error(message);
  }
  if (response.status === 204) return null;
  return response.json();
}

// ClientDTO: { id, lastName, firstName, phoneNumber, email }

export async function getClientById(id) {
  const res = await fetch(ENDPOINTS.clientById(id));
  return handleResponse(res);
}

export async function createClient(client) {
  const res = await fetch(ENDPOINTS.clients, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(client),
  });
  return handleResponse(res);
}

export async function updateClient(id, client) {
  const res = await fetch(ENDPOINTS.clientById(id), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(client),
  });
  return handleResponse(res);
}
