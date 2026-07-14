import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import Stepper from '../components/Stepper';

export default function SearchPage() {
  const navigate = useNavigate();
  const { searchCriteria, setSearchCriteria } = useBooking();
  const [form, setForm] = useState(searchCriteria);
  const [erreur, setErreur] = useState(null);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
  e.preventDefault();

  setErreur(null);
  setSearchCriteria(form);
  navigate('/trajets');
};

  const handleVoirTout = () => {
    setSearchCriteria({ villeDepart: '', villeDestination: '', dateDepart: '' });
    navigate('/trajets');
  };

  return (
    <div className="section">
      <div className="container">
        <Stepper current="recherche" />
        <h1 className="page-title">Rechercher un trajet</h1>
        <p className="page-subtitle">Indiquez vos critères de voyage pour trouver le bus qui vous convient.</p>

        <div className="card" style={{ maxWidth: '560px' }}>
          {erreur && <div className="alert alert-error">{erreur}</div>}
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Ville de départ</label>
              <input
                type="text"
                placeholder="Ex : Abidjan"
                value={form.villeDepart}
                onChange={handleChange('villeDepart')}
              />
            </div>
            <div className="field">
              <label>Ville de destination</label>
              <input
                type="text"
                placeholder="Ex : Yamoussoukro"
                value={form.villeDestination}
                onChange={handleChange('villeDestination')}
              />
            </div>
            <div className="field">
              <label>Date de départ</label>
              <input type="date" value={form.dateDepart} onChange={handleChange('dateDepart')} />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button type="submit" className="btn btn-primary btn-block">🔍 Rechercher</button>
              <button type="button" className="btn btn-outline" onClick={handleVoirTout}>
                Voir tous les trajets
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
