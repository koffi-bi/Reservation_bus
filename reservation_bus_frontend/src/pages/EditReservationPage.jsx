import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getReservationComplete, modifierReservation } from '../services/reservationService';

export default function EditReservationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
  const [form, setForm] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [enregistrement, setEnregistrement] = useState(false);
  const [erreur, setErreur] = useState(null);
  const [succes, setSucces] = useState(false);

  useEffect(() => {
    getReservationComplete(id)
      .then(({ reservation, client }) => {
        setReservation(reservation);
        setForm({
          seatNumber: reservation.seatNumber ?? '',
          status: reservation.status || 'CONFIRMED',
          nom: client?.lastName || '',
          prenom: client?.firstName || '',
          email: client?.email || '',
          telephone: client?.phoneNumber || '',
        });
      })
      .catch((err) => setErreur(err.message))
      .finally(() => setChargement(false));
  }, [id]);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnregistrement(true);
    setErreur(null);
    setSucces(false);
    try {
      await modifierReservation(id, {
        seatNumber: Number(form.seatNumber),
        status: form.status,
        clientId: reservation.clientId,
        voyageur: { nom: form.nom, prenom: form.prenom, email: form.email, telephone: form.telephone },
      });
      setSucces(true);
      setTimeout(() => navigate('/mes-reservations'), 900);
    } catch (err) {
      setErreur(err.message);
    } finally {
      setEnregistrement(false);
    }
  };

  if (chargement) return <div className="section container"><p>Chargement…</p></div>;

  if (erreur && !form) {
    return (
      <div className="section container">
        <div className="alert alert-error"><strong>Erreur :</strong> {erreur}</div>
        <button className="btn btn-outline" onClick={() => navigate('/mes-reservations')}>← Retour</button>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="page-title">Modifier la réservation #{id}</h1>
        <p className="page-subtitle">Mettez à jour les informations du voyageur ou le siège.</p>

        {erreur && <div className="alert alert-error"><strong>Erreur :</strong> {erreur}</div>}
        {succes && <div className="alert alert-success">Réservation mise à jour avec succès ✅</div>}

        <div className="card" style={{ maxWidth: '520px' }}>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Nom</label>
              <input type="text" value={form.nom} onChange={handleChange('nom')} required />
            </div>
            <div className="field">
              <label>Prénom</label>
              <input type="text" value={form.prenom} onChange={handleChange('prenom')} required />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" value={form.email} onChange={handleChange('email')} required />
            </div>
            <div className="field">
              <label>Téléphone</label>
              <input type="tel" value={form.telephone} onChange={handleChange('telephone')} required />
            </div>
            <div className="field">
              <label>Numéro de siège</label>
              <input type="number" min="1" value={form.seatNumber} onChange={handleChange('seatNumber')} required />
            </div>
            <div className="field">
              <label>Statut</label>
              <select value={form.status} onChange={handleChange('status')}>
                <option value="CONFIRMED">CONFIRMED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" className="btn btn-outline" onClick={() => navigate('/mes-reservations')} disabled={enregistrement}>
                Annuler
              </button>
              <button type="submit" className="btn btn-primary btn-block" disabled={enregistrement}>
                {enregistrement ? 'Enregistrement…' : 'Enregistrer les modifications'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
