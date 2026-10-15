const WIRE = '.agiler-wf{fill:var(--color-surface-sunken);stroke:var(--color-border);stroke-width:1}';

export function DataTablePreview() {
  return (
    <svg viewBox="0 0 320 200" role="img" aria-label="Data Table layout wireframe">
      <style>{WIRE}</style>
      <rect x="8" y="8" width="72" height="184" rx="6" className="agiler-wf" />
      <rect x="88" y="8" width="224" height="24" rx="4" className="agiler-wf" />
      <rect x="88" y="40" width="224" height="18" rx="4" className="agiler-wf" />
      <rect x="88" y="64" width="224" height="112" rx="5" className="agiler-wf" />
      <rect x="88" y="182" width="224" height="10" rx="3" className="agiler-wf" />
      <rect x="96" y="72" width="208" height="10" rx="3" className="agiler-wf" />
      <rect x="96" y="90" width="208" height="10" rx="3" className="agiler-wf" />
      <rect x="96" y="108" width="208" height="10" rx="3" className="agiler-wf" />
      <rect x="96" y="126" width="208" height="10" rx="3" className="agiler-wf" />
      <rect x="96" y="144" width="208" height="10" rx="3" className="agiler-wf" />
      <rect x="96" y="162" width="120" height="10" rx="3" className="agiler-wf" />
    </svg>
  );
}
