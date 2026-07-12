import type { CSSProperties } from "react";

export interface RepoLang {
  language?: string | null;
  languages?: Record<string, number> | null;
}

interface LangStat {
  name: string;
  bytes: number;
  pct: number;
}

function aggregate(repos: RepoLang[]): {
  list: LangStat[];
  total: number;
  top: LangStat | null;
  langCount: number;
} {
  const totals: Record<string, number> = {};

  for (const r of repos) {
    const map =
      r.languages && typeof r.languages === "object" && Object.keys(r.languages).length > 0
        ? r.languages
        : r.language
          ? { [r.language]: 1 }
          : {};
    for (const [lang, bytes] of Object.entries(map)) {
      totals[lang] = (totals[lang] ?? 0) + (typeof bytes === "number" ? bytes : 1);
    }
  }

  const total = Object.values(totals).reduce((a, b) => a + b, 0);
  const list = Object.entries(totals)
    .map(([name, bytes]) => ({
      name,
      bytes,
      pct: total > 0 ? Math.round((bytes / total) * 100) : 0,
    }))
    .sort((a, b) => b.bytes - a.bytes);

  return { list, total, top: list[0] ?? null, langCount: list.length };
}

/**
 * Language Capabilities — derived from the user's repo list.
 * Shows the most-used language overall (byte-weighted) and every language
 * coded in, as flat neobrutalist bars. Reusable on dashboard / profile / report.
 */
export function LanguageCapabilities({ repositories }: { repositories: RepoLang[] }) {
  const { list, top, langCount } = aggregate(repositories);
  if (list.length === 0) return null;

  return (
    <div className="card" style={{ borderRadius: 0, padding: "2rem" }}>
      <div className="uppercase-label" style={{ marginBottom: "1.5rem" }}>
        Language Capabilities
      </div>

      {/* Most used overall */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "0.75rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--muted)" }}>
          Most used overall
        </span>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 700, color: "var(--accent)", lineHeight: 1 }}>
          {top?.name}
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "1rem", color: "var(--muted)" }}>
          {top?.pct}%
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--muted)", marginLeft: "auto" }}>
          {langCount} languages coded
        </span>
      </div>

      {/* Bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {list.map((l) => (
          <div key={l.name} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span
              style={{
                width: "120px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                textTransform: "uppercase",
                letterSpacing: "0.03em",
                flexShrink: 0,
              }}
            >
              {l.name}
            </span>
            <div
              style={{
                flex: 1,
                height: "10px",
                border: "var(--border-width) solid var(--ink)",
                borderRadius: 0,
                overflow: "hidden",
                background: "var(--paper)",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${l.pct}%`,
                  background: l.name === top?.name ? "var(--accent)" : "var(--ink)",
                } as CSSProperties}
              />
            </div>
            <span
              style={{
                width: "44px",
                textAlign: "right",
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                fontWeight: 700,
              }}
            >
              {l.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
