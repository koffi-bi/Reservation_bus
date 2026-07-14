import { ENDPOINTS } from '../config/apiConfig';
import { getTripById } from './tripService';
import { createClient, getClientById, updateClient } from './clientService';
import { getTicketById } from './ticketService';

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

// ReservationDTO: { id, reservationDate, status, seatNumber, clientId, tripId, ticketId }

export async function getAllReservations() {
  const res = await fetch(ENDPOINTS.reservations);
  return handleResponse(res);
}

export async function getReservationById(id) {
  const res = await fetch(ENDPOINTS.reservationById(id));
  return handleResponse(res);
}

export async function createReservationDTO(payload) {
  const res = await fetch(ENDPOINTS.reservations, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function updateReservationDTO(id, payload) {
  const res = await fetch(ENDPOINTS.reservationById(id), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

export async function deleteReservation(id) {
  const res = await fetch(ENDPOINTS.reservationById(id), { method: 'DELETE' });
  return handleResponse(res);
}

// ----------------------------------------------------------------------------
// Flux complet de réservation : le backend n'a pas d'endpoint unique qui
// prend un trajet + des infos voyageur et rend un ticket. Il faut donc
// enchaîner : 1) créer le Client  2) créer la Reservation (qui déclenche la
// création du Ticket côté backend).
// ----------------------------------------------------------------------------
export async function reserverTrajet({ tripId, seatNumber, voyageur }) {
  const client = await createClient({
    firstName: voyageur.prenom,
    lastName: voyageur.nom,
    email: voyageur.email,
    phoneNumber: voyageur.telephone,
  });

  const reservation = await createReservationDTO({
    tripId,
    clientId: client.id,
    seatNumber,
    status: 'CONFIRMED',
    reservationDate: new Date().toISOString(),
  });

  return { reservation, client };
}

// La réponse du POST /api/reservations peut arriver AVANT que le ticketId
// ne soit disponible côté backend (ex: le DTO est construit avant que le
// Ticket ne soit lié/rafraîchi sur l'entité Reservation). On re-vérifie donc
// avec un GET, en réessayant quelques fois si besoin, plutôt que de se fier
// à la première réponse.
export async function attendreReservationAvecTicket(reservationId, { tentatives = 6, delaiMs = 400 } = {}) {
  let reservation = await getReservationById(reservationId);
  let essai = 0;
  while (!reservation.ticketId && essai < tentatives) {
    await new Promise((resolve) => setTimeout(resolve, delaiMs));
    reservation = await getReservationById(reservationId);
    essai += 1;
  }
  return reservation;
}

// Récupère une réservation avec son trajet, son client et son ticket
// assemblés, pour l'affichage (ticket, liste "mes réservations", etc.)
export async function getReservationComplete(reservationOrId) {
  const reservation = typeof reservationOrId === 'object'
    ? reservationOrId
    : await getReservationById(reservationOrId);

  const [trip, client, ticket] = await Promise.all([
    reservation.tripId ? getTripById(reservation.tripId).catch(() => null) : null,
    reservation.clientId ? getClientById(reservation.clientId).catch(() => null) : null,
    reservation.ticketId ? getTicketById(reservation.ticketId).catch(() => null) : null,
  ]);

  return { reservation, trip, client, ticket };
}

export async function getAllReservationsComplete() {
  const reservations = await getAllReservations();
  return Promise.all((reservations || []).map((r) => getReservationComplete(r)));
}

// Met à jour une réservation (siège / statut) et, si fourni, les infos client.
export async function modifierReservation(id, { seatNumber, status, clientId, voyageur }) {
  const reservationActuelle = await getReservationById(id);

  if (voyageur && clientId) {
    await updateClient(clientId, {
      firstName: voyageur.prenom,
      lastName: voyageur.nom,
      email: voyageur.email,
      phoneNumber: voyageur.telephone,
    });
  }

  return updateReservationDTO(id, {
    ...reservationActuelle,
    seatNumber: seatNumber ?? reservationActuelle.seatNumber,
    status: status ?? reservationActuelle.status,
  });
}
