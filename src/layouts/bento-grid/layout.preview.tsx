const WIRE = '.agiler-wf{fill:var(--color-surface-sunken);stroke:var(--color-border);stroke-width:1}';

export function BentoGridPreview() {
  return (
    <svg viewBox="0 0 320 200" role="img" aria-label="Bento Grid layout wireframe">
      <style>{WIRE}</style>
      <rect x="8" y="8" width="304" height="20" rx="4" className="agiler-wf" />
      <rect x="8" y="36" width="304" height="44" rx="6" className="agiler-wf" />
      <rect x="8" y="88" width="148" height="48" rx="5" className="agiler-wf" />
      <rect x="164" y="88" width="72" height="48" rx="5" className="agiler-wf" />
      <rect x="244" y="88" width="68" height="48" rx="5" className="agiler-wf" />
      <rect x="8" y="144" width="94" height="48" rx="5" className="agiler-wf" />
      <rect x="110" y="144" width="94" height="48" rx="5" className="agiler-wf" />
      <rect x="212" y="144" width="100" height="48" rx="5" className="agiler-wf" />
    </svg>
  );
}
