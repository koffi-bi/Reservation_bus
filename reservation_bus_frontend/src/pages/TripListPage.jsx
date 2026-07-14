import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTrips, searchTrips } from '../services/tripService';
import { useBooking } from '../context/BookingContext';
import Stepper from '../components/Stepper';
import TripCard from '../components/TripCard';

export default function TripListPage() {
  const navigate = useNavigate();
  const { searchCriteria, setSelectedTrip } = useBooking();
  const [trajets, setTrajets] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  // Le backend exige les 3 critères pour /api/trips/search ; s'il en manque
  // un, on retombe sur la liste complète plutôt que d'envoyer une requête
  // incomplète qui échouerait.
  const criteresComplets = searchCriteria.villeDepart && searchCriteria.villeDestination && searchCriteria.dateDepart;

  useEffect(() => {
    setChargement(true);
    setErreur(null);

    const requete = criteresComplets ? searchTrips(searchCriteria) : getAllTrips();

    requete
      .then((data) => setTrajets(data || []))
      .catch((err) => {
        console.error('Erreur lors de la récupération des trajets :', err);
        setErreur(err.message);
      })
      .finally(() => setChargement(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReserver = (trajet) => {
    setSelectedTrip(trajet);
    navigate('/voyageur');
  };

  return (
    <div className="section">
      <div className="container">
        <Stepper current="trajets" />
        <h1 className="page-title">Trajets disponibles</h1>
        <p className="page-subtitle">
          {criteresComplets
            ? `Résultats pour ${searchCriteria.villeDepart} ➔ ${searchCriteria.villeDestination} le ${searchCriteria.dateDepart}`
            : 'Tous les trajets disponibles.'}
        </p>

        {erreur && (
          <div className="alert alert-error">
            <strong>Erreur de connexion au backend :</strong> {erreur}
          </div>
        )}

        {chargement ? (
          <p>Chargement des trajets…</p>
        ) : trajets.length === 0 && !erreur ? (
          <div className="empty-state">
            <span className="emoji">🚌</span>
            Aucun trajet ne correspond à votre recherche.
            <div style={{ marginTop: '16px' }}>
              <button className="btn btn-outline" onClick={() => navigate('/recherche')}>
                Modifier la recherche
              </button>
            </div>
          </div>
        ) : (
          <div className="grid-cards">
            {trajets.map((trajet) => (
              <TripCard key={trajet.id} trajet={trajet} onReserver={handleReserver} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
