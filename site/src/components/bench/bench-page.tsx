"use client";

import { useState } from "react";
import { Bars, Matrix } from "@/components/bench/charts";
import type { BarRow, MatrixColumn, MatrixRow } from "@/components/bench/charts";
import { cellFor, formatMs, formatUsd, formatValue } from "@/lib/results";
import type { Metric, Results } from "@/lib/results";
import { cn } from "@/lib/utils";

const REPO = "https://github.com/opencoredev/storage-bench";

/** Chart titles in plain words, in page order. Ids come from src/model.ts. */
const TITLES: readonly (readonly [id: string, title: string])[] = [
  ["ttfb-1kb", "Time to first byte"],
  ["up-1mb", "Upload 1 MB"],
  ["get-1mb", "Download 1 MB"],
  ["up-100mb", "Upload 100 MB"],
  ["get-100mb", "Download 100 MB"],
  ["first", "First request after a deploy"],
  ["par-up", "16 uploads at once"],
  ["list", "List 1,000 files"],
];

const ALL = "all";

function Chips({ label, options, value, onChange }: { label: string; options: readonly { id: string; label: string; sub?: string }[]; value: string; onChange: (id: string) => void }) {
  return (
    <div role="radiogroup" aria-label={label} className="-mx-5 flex gap-1.5 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={o.id === value}
          onClick={() => onChange(o.id)}
          className={cn(
            "h-8 shrink-0 rounded-full border px-3 text-sm whitespace-nowrap outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-foreground/40",
            o.id === value ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground",
          )}
        >
          {o.label}
          {o.sub ? <span className={cn("ml-1.5 text-xs", o.id === value ? "text-background/70" : "text-muted-foreground/80")}>{o.sub}</span> : null}
        </button>
      ))}
    </div>
  );
}

function Chart({ title, note, children }: { title: string; note: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border py-10">
      <h2 className="text-base font-medium">
        {title} <span className="ml-1 text-sm font-normal text-muted-foreground">{note}</span>
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function BenchPage({ results }: { results: Results }) {
  const { clients, providers, metrics } = results;
  const [clientId, setClientId] = useState<string>(ALL);
  const [workload, setWorkload] = useState("1");
  const all = clientId === ALL;
  const client = clients.find((c) => c.id === clientId) ?? clients[0];
  if (!client) return null;
  // The Railway clients share a network with Railway Buckets, so they are marked wherever locations are named.
  const onRailway = (c: (typeof clients)[number]) => c.host === "Railway";
  const columns: MatrixColumn[] = clients.map((c) => ({ id: c.id, label: c.label.replace(", Virginia", "").replace(", France", "").replace(" home line", ""), host: onRailway(c) ? "on Railway" : c.host, flagged: onRailway(c) }));

  const matrixFor = (metric: Metric): MatrixRow[] => {
    const order = rowsForClient(metric, clients[0]?.id ?? "").map((r) => r.id);
    const rank = (id: string) => (order.includes(id) ? order.indexOf(id) : order.length);
    return providers
      .map((p) => ({
        id: p.id,
        label: p.label,
        cells: clients.map((c) => {
          const cell = cellFor(metric, p.id, c.id);
          return cell ? { value: cell.value, text: formatValue(metric, cell.value) } : null;
        }),
      }))
      // Providers without a result in the ranking column (a test they can't run) go last, not first.
      .sort((a, b) => rank(a.id) - rank(b.id));
  };

  function rowsForClient(metric: Metric, id: string): BarRow[] {
    return providers
      .flatMap((p) => {
        const cell = cellFor(metric, p.id, id);
        if (!cell) return [];
        const tail = cell.p95 !== null ? `, p95 ${formatMs(cell.p95)}` : "";
        return [{ id: p.id, label: p.label, sub: p.place, value: cell.value, text: formatValue(metric, cell.value), detail: `${p.label}: median ${formatValue(metric, cell.value)}${tail}` }];
      })
      .sort((a, b) => (metric.better === "higher" ? b.value - a.value : a.value - b.value));
  }
  const rowsFor = (metric: Metric) => rowsForClient(metric, client.id);


  const failureText = (rate: number) => (rate === 0 ? "0%" : `${(rate * 100).toFixed(1)}%`);
  const uploadRate = (pid: string, cid: string) => {
    const r = results.uploadReliability[pid]?.[cid] ?? { samples: 0, failures: 0 };
    return r.samples > 0 ? r.failures / r.samples : 0;
  };
  const failureMatrix: MatrixRow[] = providers.map((p) => ({
    id: p.id,
    label: p.label,
    cells: clients.map((c) => ({ value: uploadRate(p.id, c.id), text: failureText(uploadRate(p.id, c.id)) })),
  }));
  const failureRows: BarRow[] = providers
    .map((p) => {
      const r = results.uploadReliability[p.id]?.[client.id] ?? { samples: 0, failures: 0 };
      const rate = r.samples > 0 ? r.failures / r.samples : 0;
      return { id: p.id, label: p.label, sub: p.place, value: rate, text: failureText(rate), detail: `${p.label}: ${r.failures} of ${r.samples.toLocaleString("en-US")} upload attempts failed` };
    })
    .sort((a, b) => a.value - b.value);

  const w = Number(workload);
  const costRows: BarRow[] = results.costs.rows
    .map((r) => ({ id: r.id, label: r.label, sub: "", value: r.monthly[w] ?? 0, text: formatUsd(r.monthly[w] ?? 0), detail: `${r.label}: ${r.model}` }))
    .sort((a, b) => a.value - b.value);

  return (
    <div className="mx-auto max-w-5xl px-5 md:px-8">
      <header className="flex items-center justify-between py-6">
        <span className="text-lg font-medium tracking-[-0.03em]">
          storage<span className="text-muted-foreground">bench</span>
        </span>
        <a className="text-sm text-muted-foreground hover:text-foreground" href={REPO}>
          GitHub
        </a>
      </header>

      <h1 className="pt-8 pb-6 text-2xl font-medium tracking-[-0.02em] text-balance md:text-3xl">
        {providers.length} object storage providers, measured from {clients.length} places
      </h1>

      <div className="sticky top-0 z-10 -mx-5 bg-background/95 px-5 py-3 backdrop-blur md:-mx-8 md:px-8">
        <Chips
          label="Measured from"
          value={clientId}
          onChange={setClientId}
          options={[{ id: ALL, label: "All locations" }, ...clients.map((c) => ({ id: c.id, label: c.label, sub: onRailway(c) ? "on Railway" : c.host }))]}
        />
      </div>

      <p className="pt-1 pb-2 text-xs text-muted-foreground">
        {all || onRailway(client)
          ? "Ashburn and Amsterdam run on Railway's own network, which may favor Railway Buckets. The other four don't."
          : `${client.label}: ${client.host === "Home server" ? "a home internet connection" : `a ${client.host} machine`}, not on Railway's network.`}{" "}
        Every bucket is in the eastern US except Tigris and Upstash, which have no region to pick. Tigris keeps each file near where it was written, so it behaves like a nearby bucket from every location.
      </p>

      <main className="pt-2">
        {TITLES.map(([id, title]) => {
          const metric = metrics.find((m) => m.id === id);
          if (!metric) return null;
          return (
            <Chart key={id} title={title} note={metric.better === "higher" ? "higher is better" : "lower is better"}>
              {all ? <Matrix columns={columns} rows={matrixFor(metric)} better={metric.better} /> : <Bars rows={rowsFor(metric)} empty="No results from here yet." />}
            </Chart>
          );
        })}
        <Chart title="Failed upload attempts" note="no retries; a parallel batch counts once">
          {all ? <Matrix columns={columns} rows={failureMatrix} better="lower" scaleMax={0.02} /> : <Bars rows={failureRows} empty="No results from here yet." scaleMax={0.02} />}
        </Chart>
        <Chart title="Monthly cost" note={results.costs.workloads[w]?.what ?? ""}>
          <div className="mb-5">
            <Chips label="Workload" value={workload} onChange={setWorkload} options={results.costs.workloads.map((wl, i) => ({ id: String(i), label: wl.name }))} />
          </div>
          <Bars rows={costRows} empty="No prices." />
          {/* Railway's bucket bill assumes direct uploads; see the Railway model in src/costs.ts. */}
          <p className="mt-2 max-w-prose text-xs text-pretty text-muted-foreground">
            Railway: uploads that go through a Railway service are billed as service egress ($0.05/GB), since buckets aren't on its private network yet. If the media workload's 10 TB is uploaded through a service each month, it costs about $650 instead of $150.
          </p>
        </Chart>
      </main>

      <footer className="flex flex-wrap justify-between gap-2 border-t border-border py-6 text-xs text-muted-foreground">
        <span>Medians of {results.runs} runs through files-sdk 3.0.0</span>
        <a className="hover:text-foreground" href={`${REPO}/blob/main/docs/METHODOLOGY.md`}>
          How it was measured
        </a>
      </footer>
    </div>
  );
}
