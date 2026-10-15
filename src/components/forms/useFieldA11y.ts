import { useId } from 'react';

export interface FieldA11yIds {
  inputId: string;
  helpId: string;
  errorId: string;
}

/** Consistent id wiring for label / helper / error associations. */
export function useFieldA11y(idProp?: string): FieldA11yIds {
  const generated = useId();
  const inputId = idProp ?? generated;
  return {
    inputId,
    helpId: `${inputId}-help`,
    errorId: `${inputId}-error`,
  };
}

export function buildDescribedBy(
  ids: FieldA11yIds,
  { hasError, hasHelp }: { hasError: boolean; hasHelp: boolean },
): string | undefined {
  const parts: string[] = [];
  if (hasError) parts.push(ids.errorId);
  else if (hasHelp) parts.push(ids.helpId);
  return parts.length > 0 ? parts.join(' ') : undefined;
}
