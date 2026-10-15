const WIRE = '.agiler-wf{fill:var(--color-surface-sunken);stroke:var(--color-border);stroke-width:1}';

export function AuthCenteredPreview() {
  return (
    <svg viewBox="0 0 320 200" role="img" aria-label="Auth-centered layout wireframe">
      <style>{WIRE}</style>
      <rect x="8" y="8" width="304" height="184" rx="6" className="agiler-wf" />
      <rect x="88" y="36" width="144" height="128" rx="8" className="agiler-wf" />
      <rect x="104" y="52" width="112" height="12" rx="4" className="agiler-wf" />
      <rect x="104" y="72" width="112" height="14" rx="7" className="agiler-wf" />
      <rect x="104" y="94" width="112" height="14" rx="4" className="agiler-wf" />
      <rect x="104" y="114" width="112" height="14" rx="4" className="agiler-wf" />
      <rect x="104" y="136" width="112" height="16" rx="4" className="agiler-wf" />
    </svg>
  );
}
