import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getReservationComplete } from '../services/reservationService';
import { useBooking } from '../context/BookingContext';

export default function TicketPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { resetBooking } = useBooking();

  const [details, setDetails] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    if (!id) {
      navigate('/mes-reservations');
      return;
    }
    // Toujours refaire un GET frais ici (jamais se fier à un objet transmis
    // par la page précédente) : la réponse du POST de création peut être
    // incomplète (voir attendreReservationAvecTicket côté ConfirmationPage).
    getReservationComplete(id)
      .then((data) => setDetails(data))
      .catch((err) => setErreur(err.message))
      .finally(() => setChargement(false));
  }, [id]);

  const handleTerminer = () => {
    resetBooking();
    navigate('/');
  };

  if (chargement) {
    return <div className="section container"><p>Chargement du ticket…</p></div>;
  }

  if (erreur || !details) {
    return (
      <div className="section container">
        <div className="alert alert-error">
          <strong>Impossible d'afficher le ticket :</strong> {erreur || 'Réservation introuvable.'}
        </div>
        <button className="btn btn-outline" onClick={() => navigate('/mes-reservations')}>Retour à mes réservations</button>
      </div>
    );
  }

  const { reservation, trip, client, ticket } = details;

  return (
    <div className="section">
      <div className="container">
        <h1 className="page-title" style={{ textAlign: 'center' }}>🎫 Votre ticket</h1>
        <p className="page-subtitle" style={{ textAlign: 'center' }}>Présentez ce ticket lors de l'embarquement.</p>

        {!ticket && (
          <div className="alert alert-info" style={{ maxWidth: '480px', margin: '0 auto 16px' }}>
            La réservation est enregistrée, mais le ticket n'a pas encore pu être récupéré. Vérifie la génération du ticket côté backend (voir la section dédiée dans le README).
          </div>
        )}

        <div className="ticket">
          <div className="ticket-header">
            <div>
              <div style={{ fontWeight: 800, fontSize: '18px' }}>🚌 IvoireBus</div>
              <div style={{ fontSize: '12px', color: '#b9bcc3' }}>Réservation N° {reservation.id}</div>
            </div>
            <span className="badge badge-blue">{reservation.status || 'CONFIRMED'}</span>
          </div>

          <div className="ticket-body">
            <div style={{ textAlign: 'center', fontSize: '20px', fontWeight: 800, marginBottom: '4px' }}>
              {trip ? `${trip.villeDepart} ➔ ${trip.villeDestination}` : 'Trajet indisponible'}
            </div>
            {trip && (
              <div style={{ textAlign: 'center', color: 'var(--color-gray)', fontSize: '13px' }}>
                {trip.dateDepart} • {trip.heureDepart}
              </div>
            )}

            <hr className="ticket-divider" />

            <div className="ticket-row"><span className="label">Passager</span><span className="value">{client ? `${client.firstName} ${client.lastName}` : '—'}</span></div>
            {trip && <div className="ticket-row"><span className="label">Bus</span><span className="value">{trip.numeroBus}</span></div>}
            <div className="ticket-row"><span className="label">Siège</span><span className="value">N° {reservation.seatNumber}</span></div>
            <div className="ticket-row"><span className="label">Code ticket</span><span className="value">{ticket?.numeroTicket || '—'}</span></div>
            {ticket?.dateGeneration && (
              <div className="ticket-row"><span className="label">Généré le</span><span className="value">{new Date(ticket.dateGeneration).toLocaleString('fr-FR')}</span></div>
            )}

            <hr className="ticket-divider" />

            <div className="ticket-row" style={{ fontSize: '17px' }}>
              <span className="label">Montant</span>
              <span className="value" style={{ color: 'var(--color-blue)' }}>
                {(trip?.prix ?? 0).toLocaleString()} FCFA
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '24px' }}>
          <button className="btn btn-outline" onClick={() => window.print()}>🖨️ Imprimer</button>
          <button className="btn btn-dark" onClick={handleTerminer}>Retour à l'accueil</button>
        </div>
      </div>
    </div>
  );
}
