// ============================================================================
// CONFIGURATION DE L'API
// ============================================================================
// Généré à partir du fichier openapi.json fourni (contrôleurs trip, reservation,
// client, ticket). Si un chemin change côté Spring Boot, c'est ici qu'il faut
// le corriger — le reste du code ne fait qu'utiliser ces constantes.
// ============================================================================

export const BASE_URL = 'http://localhost:8080';

export const ENDPOINTS = {
  // Trajets (trip-controller)
  trips: `${BASE_URL}/api/trips`,                              // GET (liste), POST (créer)
  tripById: (id) => `${BASE_URL}/api/trips/${id}`,             // GET, PUT, DELETE
  tripSearch: `${BASE_URL}/api/trips/search`,                  // GET ?villeDepart=&villeDestination=&dateDepart=

  // Réservations (reservation-controller)
  reservations: `${BASE_URL}/api/reservations`,                // GET (liste), POST (créer)
  reservationById: (id) => `${BASE_URL}/api/reservations/${id}`, // GET, PUT, DELETE
  reservationsByClient: (clientId) => `${BASE_URL}/api/reservations/client/${clientId}`, // GET

  // Clients (client-controller)
  clients: `${BASE_URL}/api/clients`,                          // GET (liste), POST (créer)
  clientById: (id) => `${BASE_URL}/api/clients/${id}`,         // GET, PUT, DELETE

  // Tickets (ticket-controller) — PAS de POST : le ticket est généré côté
  // backend automatiquement quand une réservation est créée.
  tickets: `${BASE_URL}/api/tickets`,                          // GET (liste)
  ticketById: (id) => `${BASE_URL}/api/tickets/${id}`,         // GET, DELETE
};

// Valeurs envoyées pour le champ "status" de ReservationDTO.
// ⚠️ À vérifier contre ton enum Java côté backend (ex: ReservationStatus) —
// si les valeurs ne correspondent pas exactement (casse comprise), le
// backend renverra une erreur 400 sur la création/modification.
export const RESERVATION_STATUS = {
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
};
