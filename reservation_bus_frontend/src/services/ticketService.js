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

// TicketDTO: { id, numeroTicket, dateGeneration, reservationId }
// Pas de POST : le ticket est généré automatiquement par le backend
// au moment où une réservation est créée (voir ReservationDTO.ticketId).

export async function getTicketById(id) {
  const res = await fetch(ENDPOINTS.ticketById(id));
  return handleResponse(res);
}

export async function deleteTicket(id) {
  const res = await fetch(ENDPOINTS.ticketById(id), { method: 'DELETE' });
  return handleResponse(res);
}
