const WIRE = '.agiler-wf{fill:var(--color-surface-sunken);stroke:var(--color-border);stroke-width:1}';

export function CardDashboardPreview() {
  return (
    <svg viewBox="0 0 320 200" role="img" aria-label="Card-based dashboard layout wireframe">
      <style>{WIRE}</style>
      <rect x="8" y="8" width="72" height="184" rx="6" className="agiler-wf" />
      <rect x="88" y="8" width="224" height="24" rx="4" className="agiler-wf" />
      <rect x="88" y="40" width="70" height="30" rx="5" className="agiler-wf" />
      <rect x="165" y="40" width="70" height="30" rx="5" className="agiler-wf" />
      <rect x="242" y="40" width="70" height="30" rx="5" className="agiler-wf" />
      <rect x="88" y="80" width="70" height="52" rx="6" className="agiler-wf" />
      <rect x="165" y="80" width="70" height="52" rx="6" className="agiler-wf" />
      <rect x="242" y="80" width="70" height="52" rx="6" className="agiler-wf" />
      <rect x="88" y="140" width="147" height="52" rx="6" className="agiler-wf" />
      <rect x="242" y="140" width="70" height="52" rx="6" className="agiler-wf" />
    </svg>
  );
}
