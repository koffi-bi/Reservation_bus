export default function TripCard({ trajet, onReserver }) {
  const complet = trajet.nombrePlaceDisponibles <= 0;

  return (
    <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
        <span className="badge badge-blue">{trajet.numeroBus}</span>
        <span style={{ color: 'var(--color-gray)', fontSize: '13px' }}>📅 {trajet.dateDepart}</span>
      </div>

      <div style={{ marginBottom: '18px' }}>
        <div style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>
          {trajet.villeDepart} <span style={{ color: 'var(--color-blue)' }}>➔</span> {trajet.villeDestination}
        </div>
        <div style={{ color: 'var(--color-gray)', fontSize: '14px' }}>
          🕒 Départ : <strong style={{ color: 'var(--color-black)' }}>{trajet.heureDepart}</strong>
        </div>
        <div className={complet ? 'badge badge-danger' : 'badge badge-success'} style={{ marginTop: '10px' }}>
          {complet ? 'Complet' : `${trajet.nombrePlaceDisponibles} places disponibles`}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid var(--color-gray-light)' }}>
        <div style={{ fontSize: '19px', fontWeight: 800 }}>{trajet.prix.toLocaleString()} FCFA</div>
        <button className="btn btn-primary btn-sm" disabled={complet} onClick={() => onReserver(trajet)}>
          {complet ? 'Indisponible' : 'Réserver'}
        </button>
      </div>
    </div>
  );
}
