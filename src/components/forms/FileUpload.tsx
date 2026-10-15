import { useCallback, useRef, useState, type DragEvent } from 'react';

import { Button } from '../buttons/Button';
import { cn } from '../../utils/cn';

import { FieldLabel } from './FieldLabel';
import { FieldMessage } from './FieldMessage';
import { buildDescribedBy, useFieldA11y } from './useFieldA11y';
import field from './field.module.css';
import styles from './FileUpload.module.css';

export interface FileUploadProps {
  label?: string;
  error?: string;
  helperText?: string;
  isRequired?: boolean;
  /** Comma-separated list or array of accepted mime types / extensions, e.g. `'image/*,.pdf'`. */
  accept?: string;
  maxSizeMb?: number;
  multiple?: boolean;
  onFilesChange: (files: File[]) => void;
  id?: string;
  disabled?: boolean;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUpload({
  label,
  error,
  helperText,
  isRequired,
  accept,
  maxSizeMb = 10,
  multiple = false,
  onFilesChange,
  id,
  disabled,
}: FileUploadProps) {
  const ids = useFieldA11y(id);
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | undefined>();

  const handleFiles = useCallback(
    (incoming: FileList | null) => {
      if (!incoming || incoming.length === 0) return;
      const list = Array.from(incoming);
      const tooLarge = list.find((file) => file.size > maxSizeMb * 1024 * 1024);
      if (tooLarge) {
        setLocalError(`"${tooLarge.name}" exceeds the ${maxSizeMb} MB limit.`);
        return;
      }
      setLocalError(undefined);
      const next = multiple ? [...files, ...list] : list.slice(0, 1);
      setFiles(next);
      onFilesChange(next);
    },
    [files, maxSizeMb, multiple, onFilesChange],
  );

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (!disabled) handleFiles(event.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    const next = files.filter((_, position) => position !== index);
    setFiles(next);
    onFilesChange(next);
  };

  const displayError = error ?? localError;
  const hasError = Boolean(displayError);

  return (
    <div className={field.field}>
      {label && (
        <FieldLabel htmlFor={ids.inputId} isRequired={isRequired}>
          {label}
        </FieldLabel>
      )}
      <div
        className={cn(styles.dropzone, isDragging && styles.dragging, hasError && styles.invalid)}
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if ((event.key === 'Enter' || event.key === ' ') && !disabled) {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        aria-disabled={disabled || undefined}
        aria-describedby={buildDescribedBy(ids, { hasError, hasHelp: Boolean(helperText) })}
      >
        <input
          ref={inputRef}
          id={ids.inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="visually-hidden"
          aria-invalid={hasError || undefined}
          onChange={(event) => handleFiles(event.target.files)}
        />
        <span className={styles.icon} aria-hidden="true">
          ⬆
        </span>
        <span className={styles.prompt}>
          <strong>Click to upload</strong> or drag and drop
        </span>
        <span className={styles.hint}>
          {accept ? `Accepted: ${accept}` : 'Any file type'} · up to {maxSizeMb} MB
        </span>
      </div>

      {files.length > 0 && (
        <ul className={styles.fileList}>
          {files.map((file, index) => (
            <li key={`${file.name}-${index}`} className={styles.fileItem}>
              <span className={styles.fileName}>{file.name}</span>
              <span className={styles.fileSize}>{formatBytes(file.size)}</span>
              <Button
                variant="link"
                size="sm"
                onClick={() => removeFile(index)}
                aria-label={`Remove ${file.name}`}
                disabled={disabled}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      )}

      <FieldMessage ids={ids} error={displayError} helperText={helperText} />
    </div>
  );
}
