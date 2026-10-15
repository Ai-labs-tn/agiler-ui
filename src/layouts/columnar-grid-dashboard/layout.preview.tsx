const WIRE = '.agiler-wf{fill:var(--color-surface-sunken);stroke:var(--color-border);stroke-width:1}';

export function ColumnarGridDashboardPreview() {
  return (
    <svg viewBox="0 0 320 200" role="img" aria-label="Columnar grid dashboard layout wireframe">
      <style>{WIRE}</style>
      <rect x="8" y="8" width="72" height="184" rx="6" className="agiler-wf" />
      <rect x="88" y="8" width="224" height="24" rx="4" className="agiler-wf" />
      <rect x="88" y="40" width="52" height="34" rx="5" className="agiler-wf" />
      <rect x="146" y="40" width="52" height="34" rx="5" className="agiler-wf" />
      <rect x="204" y="40" width="52" height="34" rx="5" className="agiler-wf" />
      <rect x="262" y="40" width="50" height="34" rx="5" className="agiler-wf" />
      <rect x="88" y="84" width="140" height="108" rx="6" className="agiler-wf" />
      <rect x="236" y="84" width="76" height="108" rx="6" className="agiler-wf" />
    </svg>
  );
}
