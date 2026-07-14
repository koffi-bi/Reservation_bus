import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import Stepper from '../components/Stepper';

export default function TravelerInfoPage() {
  const navigate = useNavigate();
  const { selectedTrip, voyageur, setVoyageur } = useBooking();
  const [form, setForm] = useState(voyageur);
  const [erreurs, setErreurs] = useState({});

  useEffect(() => {
    if (!selectedTrip) navigate('/recherche');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const err = {};
    if (!form.nom.trim()) err.nom = 'Le nom est requis.';
    if (!form.prenom.trim()) err.prenom = 'Le prénom est requis.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Email invalide.';
    if (!/^[0-9+ ]{8,15}$/.test(form.telephone)) err.telephone = 'Numéro de téléphone invalide.';
    setErreurs(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setVoyageur(form);
    navigate('/siege');
  };

  if (!selectedTrip) return null;

  return (
    <div className="section">
      <div className="container">
        <Stepper current="voyageur" />
        <h1 className="page-title">Informations du voyageur</h1>
        <p className="page-subtitle">
          Trajet : <strong>{selectedTrip.villeDepart} ➔ {selectedTrip.villeDestination}</strong> — {selectedTrip.dateDepart} à {selectedTrip.heureDepart}
        </p>

        <div className="card" style={{ maxWidth: '560px' }}>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Nom</label>
              <input type="text" value={form.nom} onChange={handleChange('nom')} placeholder="Kouassi" />
              {erreurs.nom && <div className="field-error">{erreurs.nom}</div>}
            </div>
            <div className="field">
              <label>Prénom</label>
              <input type="text" value={form.prenom} onChange={handleChange('prenom')} placeholder="Aya" />
              {erreurs.prenom && <div className="field-error">{erreurs.prenom}</div>}
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" value={form.email} onChange={handleChange('email')} placeholder="aya.kouassi@email.com" />
              {erreurs.email && <div className="field-error">{erreurs.email}</div>}
            </div>
            <div className="field">
              <label>Téléphone</label>
              <input type="tel" value={form.telephone} onChange={handleChange('telephone')} placeholder="+225 07 00 00 00 00" />
              {erreurs.telephone && <div className="field-error">{erreurs.telephone}</div>}
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" className="btn btn-outline" onClick={() => navigate('/trajets')}>
                ← Retour
              </button>
              <button type="submit" className="btn btn-primary btn-block">Continuer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
