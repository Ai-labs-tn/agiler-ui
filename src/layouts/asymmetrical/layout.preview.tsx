const WIRE = '.agiler-wf{fill:var(--color-surface-sunken);stroke:var(--color-border);stroke-width:1}';

export function AsymmetricalPreview() {
  return (
    <svg viewBox="0 0 320 200" role="img" aria-label="Asymmetrical layout wireframe">
      <style>{WIRE}</style>
      <rect x="8" y="8" width="304" height="20" rx="4" className="agiler-wf" />
      <rect x="8" y="36" width="304" height="40" rx="6" className="agiler-wf" />
      <rect x="8" y="84" width="196" height="64" rx="6" className="agiler-wf" />
      <rect x="212" y="84" width="100" height="64" rx="6" className="agiler-wf" />
      <rect x="8" y="156" width="196" height="36" rx="6" className="agiler-wf" />
      <rect x="212" y="156" width="100" height="36" rx="6" className="agiler-wf" />
    </svg>
  );
}
