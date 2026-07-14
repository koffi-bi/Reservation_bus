const STEPS = [
  { key: 'recherche', label: 'Recherche' },
  { key: 'trajets', label: 'Trajets' },
  { key: 'voyageur', label: 'Voyageur' },
  { key: 'siege', label: 'Siège' },
  { key: 'confirmation', label: 'Confirmation' },
];

export default function Stepper({ current }) {
  const currentIndex = STEPS.findIndex((s) => s.key === current);

  return (
    <div className="stepper">
      {STEPS.map((step, index) => {
        let state = '';
        if (index < currentIndex) state = 'done';
        if (index === currentIndex) state = 'current';
        return (
          <div key={step.key} style={{ display: 'flex', alignItems: 'center' }}>
            <div className={`step ${state}`}>
              <span className="step-badge">{index < currentIndex ? '✓' : index + 1}</span>
              {step.label}
            </div>
            {index < STEPS.length - 1 && <span className="step-sep" />}
          </div>
        );
      })}
    </div>
  );
}
