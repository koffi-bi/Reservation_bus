import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="section">
      <div className="container">
        <div
          className="card"
          style={{
            background: 'var(--color-black)',
            color: 'var(--color-white)',
            border: 'none',
            padding: '48px 32px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '38px', marginBottom: '10px' }}>🚌</div>
          <h1 style={{ fontSize: '30px', fontWeight: 800, margin: '0 0 10px' }}>
            Voyagez en toute simplicité avec <span style={{ color: 'var(--color-blue)' }}>IvoireBus</span>
          </h1>
          <p style={{ color: '#c9ccd3', maxWidth: '520px', margin: '0 auto 26px', fontSize: '15px' }}>
            Trouvez un trajet, choisissez votre siège, et recevez votre ticket en quelques clics.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => navigate('/recherche')}>
              🔍 Rechercher un trajet
            </button>
            <button className="btn btn-outline" style={{ background: 'transparent', color: 'var(--color-white)', borderColor: '#3a3d45' }} onClick={() => navigate('/mes-reservations')}>
              🎫 Mes réservations
            </button>
          </div>
        </div>

        <div className="grid-cards" style={{ marginTop: '28px' }}>
          <div className="card">
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔍</div>
            <h3 style={{ margin: '0 0 6px' }}>1. Recherchez</h3>
            <p style={{ color: 'var(--color-gray)', fontSize: '14px', margin: 0 }}>
              Indiquez votre ville de départ, de destination, et la date de votre voyage.
            </p>
          </div>
          <div className="card">
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>💺</div>
            <h3 style={{ margin: '0 0 6px' }}>2. Choisissez votre siège</h3>
            <p style={{ color: 'var(--color-gray)', fontSize: '14px', margin: 0 }}>
              Sélectionnez le trajet qui vous convient et réservez votre place.
            </p>
          </div>
          <div className="card">
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎫</div>
            <h3 style={{ margin: '0 0 6px' }}>3. Recevez votre ticket</h3>
            <p style={{ color: 'var(--color-gray)', fontSize: '14px', margin: 0 }}>
              Votre ticket est généré automatiquement et reste accessible à tout moment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
