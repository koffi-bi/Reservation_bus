import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import Stepper from '../components/Stepper';

// Le backend n'expose pas de détail siège par siège (pas d'endpoint dédié) :
// TripDTO donne seulement nombrePlaceDisponibles. On propose donc une grille
// de 1 à nombrePlaceDisponibles, sans distinction "occupé/libre" au-delà de
// ce total — à améliorer côté backend si tu veux un vrai plan de sièges
// (voir suggestions en fin de conversation).
export default function SeatSelectionPage() {
  const navigate = useNavigate();
  const { selectedTrip, selectedSeat, setSelectedSeat } = useBooking();

  useEffect(() => {
    if (!selectedTrip) navigate('/recherche');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!selectedTrip) return null;

  const capacite = selectedTrip.nombrePlaceDisponibles || 0;
const placesOccupees = selectedTrip.nombrePlaceOccupees || 0;
const placesLibres = selectedTrip.nombrePlaceLibres || capacite;
  const numeros = Array.from({ length: capacite }, (_, i) => i + 1);

  const handleSubmit = () => {
    if (!selectedSeat) return;
    navigate('/confirmation');
  };

  return (
    <div className="section">
      <div className="container">
        <Stepper current="siege" />
        <h1 className="page-title">Choix du siège</h1>
        <p className="page-subtitle">
          {selectedTrip.villeDepart} ➔ {selectedTrip.villeDestination} — Bus {selectedTrip.numeroBus}
        </p>
        <div
  style={{
    marginBottom: '20px',
    padding: '12px',
    borderRadius: '8px',
    background: '#f8f9fa',
    border: '1px solid #ddd'
  }}
>
  <strong>Capacité :</strong> {capacite} places
  <br />
  <strong>Occupées :</strong> {placesOccupees}
  <br />
  <strong>Libres :</strong> {placesLibres}
</div>

        <div className="card">
          {placesLibres === 0 ?  (
            <div className="alert alert-error">Ce trajet est complet, aucun siège disponible.</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(54px, 1fr))', gap: '10px', maxWidth: '480px' }}>
              {numeros.map((n) => {
                const choisi = selectedSeat === n;
                return (
                  <button
                    key={n}
                    onClick={() => setSelectedSeat(n)}
                    className="btn btn-sm"
                    style={{
                      background: choisi ? 'var(--color-blue)' : 'var(--color-white)',
                      color: choisi ? 'var(--color-white)' : 'var(--color-black)',
                      border: `1.5px solid ${choisi ? 'var(--color-blue)' : 'var(--color-gray-light)'}`,
                    }}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
          )}
          <div style={{ display: 'flex', gap: '18px', marginTop: '20px', fontSize: '13px', color: 'var(--color-gray)' }}>
            <span>🟦 Sélectionné</span>
            <span>⬜ Disponible</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', maxWidth: '480px' }}>
          <button className="btn btn-outline" onClick={() => navigate('/voyageur')}>← Retour</button>
          <button className="btn btn-primary btn-block" disabled={!selectedSeat} onClick={handleSubmit}>
            {selectedSeat ? `Continuer avec le siège ${selectedSeat}` : 'Sélectionnez un siège'}
          </button>
        </div>
      </div>
    </div>
  );
}
