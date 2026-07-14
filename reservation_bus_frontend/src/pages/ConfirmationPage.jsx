import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { reserverTrajet, attendreReservationAvecTicket } from '../services/reservationService';
import Stepper from '../components/Stepper';

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const { selectedTrip, voyageur, selectedSeat, setLastReservation } = useBooking();
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    if (!selectedTrip || !voyageur.nom || !selectedSeat) {
      navigate('/recherche');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!selectedTrip) return null;

  const handleConfirmer = async () => {
    setEnvoi(true);
    setErreur(null);
    try {
      // 1) crée le Client, 2) crée la Reservation (le backend génère le
      // Ticket automatiquement à cette étape).
      const { reservation } = await reserverTrajet({
        tripId: selectedTrip.id,
        seatNumber: selectedSeat,
        voyageur,
      });
      // La réponse du POST peut arriver avant que ticketId ne soit
      // renseigné côté backend : on re-vérifie avec un GET (avec quelques
      // essais) avant d'afficher le ticket.
      const reservationAvecTicket = await attendreReservationAvecTicket(reservation.id);
      setLastReservation(reservationAvecTicket);
      navigate(`/ticket/${reservationAvecTicket.id}`);
    } catch (err) {
      console.error('Erreur lors de la création de la réservation :', err);
      setErreur(err.message);
    } finally {
      setEnvoi(false);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <Stepper current="confirmation" />
        <h1 className="page-title">Confirmer la réservation</h1>
        <p className="page-subtitle">Vérifiez les détails avant de valider.</p>

        {erreur && (
          <div className="alert alert-error">
            <strong>La réservation a échoué :</strong> {erreur}
          </div>
        )}

        <div className="card" style={{ maxWidth: '520px' }}>
          <h3 style={{ marginTop: 0 }}>Trajet</h3>
          <div className="ticket-row"><span className="label">Itinéraire</span><span className="value">{selectedTrip.villeDepart} ➔ {selectedTrip.villeDestination}</span></div>
          <div className="ticket-row"><span className="label">Date</span><span className="value">{selectedTrip.dateDepart}</span></div>
          <div className="ticket-row"><span className="label">Heure</span><span className="value">{selectedTrip.heureDepart}</span></div>
          <div className="ticket-row"><span className="label">Bus</span><span className="value">{selectedTrip.numeroBus}</span></div>
          <div className="ticket-row"><span className="label">Siège</span><span className="value">N° {selectedSeat}</span></div>

          <hr className="ticket-divider" />

          <h3>Voyageur</h3>
          <div className="ticket-row"><span className="label">Nom complet</span><span className="value">{voyageur.prenom} {voyageur.nom}</span></div>
          <div className="ticket-row"><span className="label">Email</span><span className="value">{voyageur.email}</span></div>
          <div className="ticket-row"><span className="label">Téléphone</span><span className="value">{voyageur.telephone}</span></div>

          <hr className="ticket-divider" />

          <div className="ticket-row" style={{ fontSize: '18px' }}>
            <span className="label">Total à payer</span>
            <span className="value" style={{ color: 'var(--color-blue)' }}>{selectedTrip.prix.toLocaleString()} FCFA</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', maxWidth: '520px' }}>
          <button className="btn btn-outline" onClick={() => navigate('/siege')} disabled={envoi}>← Retour</button>
          <button className="btn btn-primary btn-block" onClick={handleConfirmer} disabled={envoi}>
            {envoi ? 'Confirmation en cours…' : '✅ Confirmer la réservation'}
          </button>
        </div>
      </div>
    </div>
  );
}
