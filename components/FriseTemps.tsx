/** Frise comparative des durées (en mois) de plusieurs scénarios. */
export type Segment = { libelle: string; mois: number; couleur: string };
export type Scenario = { nom: string; segments: Segment[] };

export default function FriseTemps({ scenarios }: { scenarios: Scenario[] }) {
  const total = (s: Scenario) => s.segments.reduce((a, x) => a + Math.max(0, x.mois), 0);
  const max = Math.max(12, ...scenarios.map(total));
  const annees = Math.ceil(max / 12);
  const echelle = annees * 12;

  return (
    <div className="frise-temps">
      {scenarios.map((s) => (
        <div key={s.nom} className="frise-temps-ligne">
          <div className="frise-temps-nom">
            <strong>{s.nom}</strong>
            <span>{formatMois(total(s))}</span>
          </div>
          <div className="frise-temps-piste">
            {s.segments.filter((x) => x.mois > 0).map((x, i) => (
              <div
                key={i}
                className="frise-temps-segment"
                style={{ width: `${(x.mois / echelle) * 100}%`, background: x.couleur }}
                title={`${x.libelle} : ${formatMois(x.mois)}`}
              >
                <span>{x.mois / echelle > 0.12 ? x.libelle : ""}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="frise-temps-axe">
        <div className="frise-temps-nom" />
        <div className="frise-temps-graduations">
          {Array.from({ length: annees + 1 }, (_, i) => (
            <span key={i} style={{ left: `${(i / annees) * 100}%` }}>{i === 0 ? "0" : `${i} an${i > 1 ? "s" : ""}`}</span>
          ))}
        </div>
      </div>
      <div className="frise-temps-legende">
        {uniques(scenarios.flatMap((s) => s.segments)).map((x) => (
          <span key={x.libelle}><i style={{ background: x.couleur }} />{x.libelle}</span>
        ))}
      </div>
    </div>
  );
}

export function formatMois(m: number) {
  if (m < 12) return `${m} mois`;
  const a = Math.floor(m / 12);
  const r = m % 12;
  return `${a} an${a > 1 ? "s" : ""}${r ? ` et ${r} mois` : ""}`;
}

function uniques(l: Segment[]) {
  const vus = new Set<string>();
  return l.filter((x) => x.mois > 0 && !vus.has(x.libelle) && vus.add(x.libelle));
}
