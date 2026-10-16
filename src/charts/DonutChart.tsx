import type { ReactNode } from 'react';

import { cn } from '../utils/cn';

import styles from './charts.module.css';
import { CHART_VARIANT_CYCLE, chartStrokeClass, chartVariantClass, type ChartVariant } from './variant';

export interface DonutSegment {
  label: string;
  value: number;
  variant?: ChartVariant;
}

export interface DonutChartProps {
  segments: DonutSegment[];
  /** Required: the chart is an image to assistive tech; the legend carries the values. */
  ariaLabel: string;
  /** Big text inside the ring (e.g. the total). */
  centerValue?: ReactNode;
  /** Small caption under the centre value. */
  centerLabel?: ReactNode;
  size?: string;
  /** Ring thickness in viewBox units (42-unit viewBox; 4–8 reads well). */
  thickness?: number;
  showLegend?: boolean;
  formatValue?: (value: number) => string;
  className?: string;
  emptyLabel?: ReactNode;
}

const RADIUS = 15.9155; // 2πr ≈ 100 → dasharray percentages read directly

/** Donut/pie chart with a legend — pure SVG, no chart library. */
export function DonutChart({
  segments,
  ariaLabel,
  centerValue,
  centerLabel,
  size = '9rem',
  thickness = 5,
  showLegend = true,
  formatValue,
  className,
  emptyLabel = 'No data yet.',
}: DonutChartProps) {
  const visible = segments.filter((segment) => segment.value > 0);
  const total = visible.reduce((sum, segment) => sum + segment.value, 0);
  if (total <= 0) {
    return <p className={styles.empty}>{emptyLabel}</p>;
  }

  let offset = 0;
  const arcs = visible.map((segment, index) => {
    const percent = (segment.value / total) * 100;
    const arc = {
      ...segment,
      percent,
      offset,
      variant: segment.variant ?? CHART_VARIANT_CYCLE[index % CHART_VARIANT_CYCLE.length],
    };
    offset += percent;
    return arc;
  });

  const format = formatValue ?? ((value: number) => String(value));

  return (
    <div className={cn(styles.donut, className)}>
      <svg
        className={styles.donutSvg}
        viewBox="0 0 42 42"
        role="img"
        aria-label={ariaLabel}
        style={{ ['--donut-size' as string]: size }}
      >
        <circle className={styles.donutTrack} cx="21" cy="21" r={RADIUS} strokeWidth={thickness} />
        {arcs.map((arc) => (
          <circle
            key={arc.label}
            className={cn(styles.donutSegment, chartStrokeClass(arc.variant))}
            cx="21"
            cy="21"
            r={RADIUS}
            strokeWidth={thickness}
            strokeDasharray={`${arc.percent} ${100 - arc.percent}`}
            strokeDashoffset={25 - arc.offset}
            strokeLinecap="butt"
          />
        ))}
        {centerValue !== undefined && (
          <text className={styles.donutCenterValue} x="21" y="20.5" textAnchor="middle">
            {centerValue}
          </text>
        )}
        {centerLabel !== undefined && (
          <text className={styles.donutCenterLabel} x="21" y="25" textAnchor="middle">
            {centerLabel}
          </text>
        )}
      </svg>

      {showLegend && (
        <ul className={styles.donutLegend}>
          {arcs.map((arc) => (
            <li key={arc.label} className={styles.donutLegendRow}>
              <span
                className={cn(styles.donutSwatch, chartVariantClass(arc.variant))}
                aria-hidden="true"
              />
              <span>{arc.label}</span>
              <span className={styles.donutLegendValue}>
                {format(arc.value)} · {Math.round(arc.percent)}%
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
