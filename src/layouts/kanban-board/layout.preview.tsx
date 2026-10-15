const WIRE = '.agiler-wf{fill:var(--color-surface-sunken);stroke:var(--color-border);stroke-width:1}';

export function KanbanBoardPreview() {
  return (
    <svg viewBox="0 0 320 200" role="img" aria-label="Kanban Board layout wireframe">
      <style>{WIRE}</style>
      <rect x="8" y="8" width="72" height="184" rx="6" className="agiler-wf" />
      <rect x="88" y="8" width="224" height="24" rx="4" className="agiler-wf" />
      <rect x="88" y="40" width="224" height="18" rx="4" className="agiler-wf" />
      <rect x="88" y="66" width="66" height="126" rx="6" className="agiler-wf" />
      <rect x="162" y="66" width="66" height="126" rx="6" className="agiler-wf" />
      <rect x="236" y="66" width="76" height="126" rx="6" className="agiler-wf" />
    </svg>
  );
}
