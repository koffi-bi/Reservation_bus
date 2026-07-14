import { ENDPOINTS } from '../config/apiConfig';

async function handleResponse(response) {
  if (!response.ok) {
    let message = `Erreur HTTP ${response.status}`;
    try {
      const body = await response.json();
      if (body?.message) message = body.message;
    } catch {
      // pas de corps JSON, on garde le message par défaut
    }
    throw new Error(message);
  }
  if (response.status === 204) return null;
  return response.json();
}

export async function getAllTrips() {
  const res = await fetch(ENDPOINTS.trips);
  return handleResponse(res);
}

export async function getTripById(id) {
  const res = await fetch(ENDPOINTS.tripById(id));
  return handleResponse(res);
}

// Le backend exige villeDepart, villeDestination ET dateDepart (les 3 sont
// "required" dans l'OpenAPI). Appelle cette fonction seulement quand les 3
// sont renseignés ; sinon utilise getAllTrips().
export async function searchTrips({ villeDepart, villeDestination, dateDepart }) {
  const params = new URLSearchParams({ villeDepart, villeDestination, dateDepart });
  const res = await fetch(`${ENDPOINTS.tripSearch}?${params.toString()}`);
  return handleResponse(res);
}
