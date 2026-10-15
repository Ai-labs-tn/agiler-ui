import { useEffect, useMemo, useState, type ReactNode } from 'react';

import { Button } from '../buttons/Button';
import { Input } from '../forms/Input';
import { Skeleton } from '../loaders/Skeleton';
import { useDebounce } from '../../hooks/useDebounce';
import { cn } from '../../utils/cn';

import { Pagination } from './Pagination';
import styles from './DataTable.module.css';

export interface Column<T> {
  key: string;
  header: string;
  accessor: (row: T) => ReactNode;
  /** Enables sorting and provides the comparable value. */
  sortValue?: (row: T) => string | number;
  /** Enables full-text search for this column. */
  searchValue?: (row: T) => string;
  /** Value used for CSV export; falls back to `sortValue`. */
  exportValue?: (row: T) => string | number | boolean | null | undefined;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  getRowId: (row: T) => string;
  isLoading?: boolean;
  caption?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: ReactNode;
  searchable?: boolean;
  searchPlaceholder?: string;
  pageSize?: number;
  pageSizeOptions?: number[];
  exportFileName?: string;
  toolbar?: ReactNode;
  rowActions?: (row: T) => ReactNode;
  onRowClick?: (row: T) => void;
  className?: string;
}

type SortState = { key: string; direction: 'asc' | 'desc' } | null;

function escapeCsv(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

function downloadCsv(content: string, fileName: string): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function DataTable<T>({
  columns,
  data,
  getRowId,
  isLoading = false,
  caption,
  emptyTitle = 'No results',
  emptyDescription = 'Try adjusting your search or filters.',
  emptyAction,
  searchable = true,
  searchPlaceholder = 'Search…',
  pageSize: initialPageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
  exportFileName = 'export.csv',
  toolbar,
  rowActions,
  onRowClick,
  className,
}: DataTableProps<T>) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortState>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const debouncedQuery = useDebounce(query, 250);

  const filtered = useMemo(() => {
    const normalized = debouncedQuery.trim().toLowerCase();
    if (!searchable || !normalized) return data;
    return data.filter((row) =>
      columns.some((column) => column.searchValue?.(row).toLowerCase().includes(normalized)),
    );
  }, [data, columns, debouncedQuery, searchable]);

  const sorted = useMemo(() => {
    if (!sort) return filtered;
    const column = columns.find((item) => item.key === sort.key);
    if (!column?.sortValue) return filtered;
    const compare = column.sortValue;
    return [...filtered].sort((a, b) => {
      const left = compare(a);
      const right = compare(b);
      if (left < right) return sort.direction === 'asc' ? -1 : 1;
      if (left > right) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filtered, sort, columns]);

  const totalItems = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(page, totalPages);
  const paged = useMemo(
    () => sorted.slice((safePage - 1) * pageSize, safePage * pageSize),
    [sorted, safePage, pageSize],
  );

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, sort, pageSize]);

  const toggleSort = (column: Column<T>) => {
    if (!column.sortable || !column.sortValue) return;
    setSort((current) => {
      if (current?.key !== column.key) return { key: column.key, direction: 'asc' };
      if (current.direction === 'asc') return { key: column.key, direction: 'desc' };
      return null;
    });
  };

  const handleExport = () => {
    const header = columns.map((column) => escapeCsv(column.header)).join(',');
    const rows = sorted.map((row) =>
      columns
        .map((column) => {
          const raw = column.exportValue?.(row) ?? column.sortValue?.(row) ?? '';
          return escapeCsv(raw === null || raw === undefined ? '' : String(raw));
        })
        .join(','),
    );
    downloadCsv([header, ...rows].join('\n'), exportFileName);
  };

  const showEmpty = !isLoading && totalItems === 0;
  const skeletonRows = Math.min(pageSize, 5);

  return (
    <div className={cn(styles.container, className)}>
      {(searchable || toolbar || columns.length > 0) && (
        <div className={styles.toolbar}>
          {searchable && (
            <div className={styles.search}>
              <Input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={searchPlaceholder}
                aria-label="Search table"
                size="sm"
              />
            </div>
          )}
          {toolbar && <div className={styles.toolbarSlot}>{toolbar}</div>}
          <Button variant="outline" size="sm" onClick={handleExport} className={styles.export}>
            Export CSV
          </Button>
        </div>
      )}

      <div className={styles.scroll}>
        <table className={styles.table}>
          {caption && <caption className={styles.caption}>{caption}</caption>}
          <thead>
            <tr>
              {columns.map((column) => {
                const isSorted = sort?.key === column.key;
                const ariaSort = isSorted
                  ? sort.direction === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : 'none';
                const sortable = Boolean(column.sortable && column.sortValue);
                return (
                  <th
                    key={column.key}
                    scope="col"
                    style={{ width: column.width, textAlign: column.align ?? 'left' }}
                    aria-sort={sortable ? ariaSort : undefined}
                  >
                    {sortable ? (
                      <button
                        type="button"
                        className={styles.sortButton}
                        onClick={() => toggleSort(column)}
                      >
                        {column.header}
                        <span className={styles.sortIcon} aria-hidden="true">
                          {isSorted ? (sort.direction === 'asc' ? '▲' : '▼') : '↕'}
                        </span>
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                );
              })}
              {rowActions && (
                <th scope="col" className={styles.actionsHeader}>
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {isLoading &&
              Array.from({ length: skeletonRows }).map((_, rowIndex) => (
                <tr key={`skeleton-${rowIndex}`}>
                  {columns.map((column) => (
                    <td key={column.key}>
                      <Skeleton height="0.9rem" />
                    </td>
                  ))}
                  {rowActions && (
                    <td>
                      <Skeleton height="0.9rem" />
                    </td>
                  )}
                </tr>
              ))}

            {!isLoading &&
              paged.map((row) => (
                <tr
                  key={getRowId(row)}
                  className={cn(onRowClick && styles.clickable)}
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                >
                  {columns.map((column) => (
                    <td key={column.key} style={{ textAlign: column.align ?? 'left' }}>
                      {column.accessor(row)}
                    </td>
                  ))}
                  {rowActions && (
                    <td className={styles.actions} onClick={(event) => event.stopPropagation()}>
                      {rowActions(row)}
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {showEmpty && (
        <div className={styles.empty} role="status">
          <p className={styles.emptyTitle}>{emptyTitle}</p>
          <p className={styles.emptyDescription}>{emptyDescription}</p>
          {emptyAction}
        </div>
      )}

      {!showEmpty && !isLoading && totalItems > 0 && (
        <Pagination
          page={safePage}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          pageSizeOptions={pageSizeOptions}
        />
      )}
    </div>
  );
}
