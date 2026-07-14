import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllReservationsComplete, deleteReservation } from '../services/reservationService';

export default function MyReservationsPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [annulationEnCours, setAnnulationEnCours] = useState(null);
  const [confirmationId, setConfirmationId] = useState(null);

  const charger = () => {
    setChargement(true);
    setErreur(null);
    getAllReservationsComplete()
      .then((data) => setItems(data || []))
      .catch((err) => setErreur(err.message))
      .finally(() => setChargement(false));
  };

  useEffect(() => {
    charger();
  }, []);

  const handleAnnuler = async (id) => {
    setAnnulationEnCours(id);
    try {
      await deleteReservation(id);
      setItems((prev) => prev.filter((item) => item.reservation.id !== id));
      setConfirmationId(null);
    } catch (err) {
      // C'est ici que remontera l'erreur Hibernate TransientPropertyValueException
      // si le cascade Reservation -> Ticket n'est pas configuré côté backend.
      setErreur(err.message);
    } finally {
      setAnnulationEnCours(null);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="page-title">Mes réservations</h1>
        <p className="page-subtitle">Consultez, modifiez ou annulez vos réservations.</p>

        {erreur && (
          <div className="alert alert-error">
            <strong>Erreur de connexion au backend :</strong> {erreur}
          </div>
        )}

        {chargement ? (
          <p>Chargement…</p>
        ) : items.length === 0 && !erreur ? (
          <div className="empty-state">
            <span className="emoji">🎫</span>
            Vous n'avez aucune réservation pour le moment.
            <div style={{ marginTop: '16px' }}>
              <button className="btn btn-primary" onClick={() => navigate('/recherche')}>Rechercher un trajet</button>
            </div>
          </div>
        ) : (
          <div className="grid-cards">
            {items.map(({ reservation, trip, client }) => {
              const id = reservation.id;
              return (
                <div key={id} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span className="badge badge-blue">Réservation #{id}</span>
                    <span className={reservation.status === 'CANCELLED' ? 'badge badge-danger' : 'badge badge-success'}>
                      {reservation.status || 'CONFIRMED'}
                    </span>
                  </div>

                  <div style={{ fontSize: '17px', fontWeight: 800, marginBottom: '6px' }}>
                    {trip ? `${trip.villeDepart} ➔ ${trip.villeDestination}` : 'Trajet indisponible'}
                  </div>
                  {trip && (
                    <div style={{ color: 'var(--color-gray)', fontSize: '13px', marginBottom: '10px' }}>
                      📅 {trip.dateDepart} • 🕒 {trip.heureDepart} • 💺 Siège {reservation.seatNumber}
                    </div>
                  )}
                  <div style={{ fontSize: '13px', color: 'var(--color-gray)', marginBottom: '16px' }}>
                    {client ? `${client.firstName} ${client.lastName}` : 'Voyageur inconnu'}
                  </div>

                  {confirmationId === id ? (
                    <div className="alert alert-error" style={{ marginBottom: '10px' }}>
                      Annuler cette réservation ? Cette action est définitive.
                      <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                        <button
                          className="btn btn-danger btn-sm btn-block"
                          disabled={annulationEnCours === id}
                          onClick={() => handleAnnuler(id)}
                        >
                          {annulationEnCours === id ? 'Annulation…' : 'Oui, annuler'}
                        </button>
                        <button className="btn btn-outline btn-sm" onClick={() => setConfirmationId(null)}>Non</button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button className="btn btn-outline btn-sm" onClick={() => navigate(`/ticket/${id}`)}>🎫 Voir le ticket</button>
                      <button className="btn btn-outline btn-sm" onClick={() => navigate(`/mes-reservations/${id}/modifier`)}>✏️ Modifier</button>
                      <button className="btn btn-danger btn-sm" onClick={() => setConfirmationId(id)}>🗑️ Annuler</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
