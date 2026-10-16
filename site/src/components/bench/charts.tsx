"use client";

import { useState } from "react";
import { fillStyle } from "@/lib/dither";
import { cn } from "@/lib/utils";

/** Each provider keeps one colour everywhere, so it can be followed from chart to chart. */
export const PROVIDER_COLORS: Record<string, string> = {
  "aws-s3": "oklch(0.8 0.15 75)",
  r2: "oklch(0.7 0.17 42)",
  railway: "oklch(0.68 0.19 300)",
  b2: "oklch(0.65 0.2 25)",
  neon: "oklch(0.8 0.16 160)",
  bunny: "oklch(0.68 0.16 255)",
  appwrite: "oklch(0.72 0.19 350)",
  convex: "oklch(0.8 0.12 200)",
  upstash: "oklch(0.78 0.17 135)",
  tigris: "oklch(0.86 0.05 280)",
};
export const colorOf = (providerId: string) => PROVIDER_COLORS[providerId] ?? "var(--muted-foreground)";

export type BarRow = {
  id: string;
  label: string;
  sub: string;
  value: number;
  text: string;
  /** Shown in the readout line when the row is hovered or focused. */
  detail: string;
};

/** Ranked horizontal bars. Each bar is a dither in its provider's colour, densest at the value. */
/** `scaleMax` fixes the full-width value, so a tiny number can't fill the chart just by being the largest. */
export function Bars({ rows, empty, scaleMax }: { rows: readonly BarRow[]; empty: string; scaleMax?: number }) {
  const [active, setActive] = useState<string | null>(null);
  const max = scaleMax ?? Math.max(...rows.map((r) => r.value), 0);
  const shown = rows.find((r) => r.id === active);

  if (rows.length === 0) return <p className="py-16 text-sm text-muted-foreground">{empty}</p>;

  return (
    <div>
      <div role="list" className="grid grid-cols-[max-content_1fr] gap-x-5 gap-y-2.5">
        {rows.map((row) => {
          // The longest bar stops short of the edge so its value fits beside it.
          const pct = max > 0 ? Math.min(100, Math.max((row.value / max) * 100, 0.5)) : 0;
          return (
            <div
              key={row.id}
              role="listitem"
              tabIndex={0}
              aria-label={row.detail}
              onPointerEnter={() => setActive(row.id)}
              onPointerLeave={() => setActive(null)}
              onFocus={() => setActive(row.id)}
              onBlur={() => setActive(null)}
              className={cn(
                "col-span-2 grid grid-cols-subgrid items-center rounded-sm transition-opacity duration-150 outline-none focus-visible:ring-2 focus-visible:ring-foreground/40",
                active !== null && active !== row.id && "opacity-45",
              )}
            >
              <span className="whitespace-nowrap">
                <span className="text-[15px] font-medium" style={{ color: colorOf(row.id) }}>
                  {row.label}
                </span>
                {row.sub ? <span className="ml-1.5 hidden text-xs text-muted-foreground sm:inline">{row.sub}</span> : null}
              </span>
              {/* Right padding reserves room for the longest value, so it never runs past the screen. */}
              <span className="relative mr-20 flex h-4 min-w-0 items-center md:h-5">
                <span aria-hidden="true" className="absolute inset-y-0 left-0" style={{ width: `${pct}%`, ...fillStyle("gradient", { color: colorOf(row.id), edge: "right", length: 18, to: 0.25 }) }} />
                <span aria-hidden="true" className="absolute inset-y-0 w-[3px]" style={{ left: `calc(${pct}% - 3px)`, background: colorOf(row.id) }} />
                <span className="absolute text-sm whitespace-nowrap tabular-nums" style={{ left: `calc(${pct}% + 10px)` }}>
                  {row.text}
                </span>
              </span>
            </div>
          );
        })}
      </div>
      <p className="mt-3 min-h-4 text-xs text-muted-foreground tabular-nums" aria-live="polite">
        {shown?.detail}
      </p>
    </div>
  );
}

export type MatrixColumn = { id: string; label: string; host: string; flagged: boolean };
export type MatrixRow = { id: string; label: string; cells: readonly ({ value: number; text: string } | null)[] };

/**
 * Every location side by side: one column per location, one row per provider. Each cell is a small bar scaled
 * to the largest value in its column, so each column reads as that location's ranking.
 */
export function Matrix({ columns, rows, better, scaleMax }: { columns: readonly MatrixColumn[]; rows: readonly MatrixRow[]; better: "lower" | "higher"; scaleMax?: number }) {
  const colMax = columns.map((_, i) => scaleMax ?? Math.max(...rows.map((r) => r.cells[i]?.value ?? 0), 0));
  const best = columns.map((_, i) => {
    const vals = rows.flatMap((r) => (r.cells[i] ? [r.cells[i].value] : []));
    return vals.length === 0 ? null : better === "higher" ? Math.max(...vals) : Math.min(...vals);
  });

  return (
    <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
      <table className="w-full min-w-[40rem] border-collapse text-sm tabular-nums">
        <thead>
          <tr>
            <th scope="col" className="sr-only">
              Provider
            </th>
            {columns.map((c) => (
              <th key={c.id} scope="col" className="pb-3 pl-3 text-left align-bottom font-normal">
                <span className="block text-foreground">{c.label}</span>
                <span className={cn("block text-xs", c.flagged ? "text-dither-orange" : "text-muted-foreground")}>{c.host}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-border/50">
              <th scope="row" className="py-2.5 pr-3 text-left font-medium whitespace-nowrap" style={{ color: colorOf(row.id) }}>
                {row.label}
              </th>
              {row.cells.map((cell, i) => {
                const max = colMax[i] ?? 0;
                const pct = cell && max > 0 ? Math.min(100, Math.max((cell.value / max) * 100, 2)) : 0;
                return (
                  <td key={columns[i]?.id ?? i} className="py-2.5 pl-3">
                    {cell ? (
                      <span className="block">
                        <span className={cell.value === best[i] ? "font-semibold text-foreground" : "text-foreground/80"}>{cell.text}</span>
                        <span aria-hidden="true" className="mt-1 block h-1.5" style={{ width: `${pct}%`, ...fillStyle("gradient", { color: colorOf(row.id), edge: "right", length: 6, to: 0.25, cell: 2 }) }} />
                      </span>
                    ) : (
                      <span className="text-muted-foreground">–</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
