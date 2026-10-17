"use client";

import { useState } from "react";
import ActionsResultat from "@/components/ActionsResultat";
import ZoneTexte from "@/components/ZoneTexte";

type Souhait = "garder" | "racheter" | "vendre" | "indecis";
type Indivisaire = { id: number; nom: string; part: number; souhait: Souhait; occupe: boolean };

const SOUHAITS: Record<Souhait, { libelle: string; couleur: string }> = {
  garder: { libelle: "Garder le bien en indivision", couleur: "#4f6659" },
  racheter: { libelle: "Racheter les parts des autres", couleur: "#9fad9e" },
  vendre: { libelle: "Vendre ou sortir", couleur: "#a88a55" },
  indecis: { libelle: "Indécis", couleur: "#c9cfc8" },
};

const EXEMPLE: Indivisaire[] = [
  { id: 1, nom: "A", part: 33.33, souhait: "racheter", occupe: true },
  { id: 2, nom: "B", part: 33.33, souhait: "vendre", occupe: false },
  { id: 3, nom: "C", part: 33.34, souhait: "indecis", occupe: false },
];

const pct = (n: number) => `${n.toLocaleString("fr-BE", { maximumFractionDigits: 2 })} %`;

export default function Schema() {
  const [bien, setBien] = useState("Maison familiale");
  const [liste, setListe] = useState<Indivisaire[]>(EXEMPLE);
  const [usufruit, setUsufruit] = useState(false);
  const [blocages, setBlocages] = useState("");

  const total = liste.reduce((a, i) => a + (i.part || 0), 0);
  const ecart = Math.abs(total - 100) > 0.05;
  const parSouhait = (Object.keys(SOUHAITS) as Souhait[]).map((s) => ({
    s,
    part: liste.filter((i) => i.souhait === s).reduce((a, i) => a + i.part, 0),
    noms: liste.filter((i) => i.souhait === s).map((i) => i.nom),
  }));

  const maj = (id: number, champ: Partial<Indivisaire>) => setListe((l) => l.map((i) => (i.id === id ? { ...i, ...champ } : i)));
  const ajouter = () =>
    liste.length < 12 &&
    setListe((l) => [...l, { id: Math.max(0, ...l.map((i) => i.id)) + 1, nom: String.fromCharCode(65 + l.length), part: 0, souhait: "indecis", occupe: false }]);
  const repartirEgal = () => {
    const n = liste.length;
    const base = Math.floor((100 / n) * 100) / 100;
    setListe((l) => l.map((i, k) => ({ ...i, part: k === n - 1 ? Math.round((100 - base * (n - 1)) * 100) / 100 : base })));
  };

  // ---------- Observations ----------
  const obs: string[] = [];
  const g = (s: Souhait) => parSouhait.find((x) => x.s === s)!;
  if (g("racheter").part > 0 && g("vendre").part > 0)
    obs.push(`Une piste naturelle : ${g("racheter").noms.join(", ")} (${pct(g("racheter").part)}) souhaite racheter, ${g("vendre").noms.join(", ")} (${pct(g("vendre").part)}) souhaite sortir. La discussion portera alors surtout sur la valeur du bien et les modalités de paiement.`);
  if (g("racheter").noms.length >= 2)
    obs.push("Plusieurs indivisaires souhaitent racheter : il faudra explorer ce que le bien représente pour chacun, au-delà du prix.");
  if (g("garder").part > 0 && g("vendre").part > 0)
    obs.push("Certains veulent conserver le bien ensemble, d'autres en sortir : une convention d'indivision encadrant la gestion, ou le rachat des parts sortantes, peuvent être envisagés.");
  if (g("indecis").part > 0)
    obs.push(`${g("indecis").noms.join(", ")} n'a pas encore de position : un entretien individuel peut l'aider à clarifier ses besoins avant une réunion commune.`);
  if (liste.some((i) => i.occupe))
    obs.push(`${liste.filter((i) => i.occupe).map((i) => i.nom).join(", ")} occupe le bien : la question d'une éventuelle indemnité d'occupation et de la prise en charge des frais devra être abordée.`);
  if (usufruit)
    obs.push("Le bien est grevé d'un usufruit : l'usufruitier doit être associé aux discussions, et les droits de chacun dépendent du démembrement (à vérifier avec le notaire).");
  if (g("vendre").part > 0)
    obs.push("Rappel : en principe, nul ne peut être contraint de rester en indivision. Une solution négociée évite une sortie judiciaire, souvent longue et coûteuse.");

  const texte = [
    `SCHÉMA DE L'INDIVISION — ${bien}`,
    "",
    ...liste.map((i) => `- ${i.nom} : ${pct(i.part)} — ${SOUHAITS[i.souhait].libelle}${i.occupe ? " (occupe le bien)" : ""}`),
    usufruit ? "- Bien grevé d'un usufruit" : "",
    "",
    "OBSERVATIONS",
    ...obs.map((o) => `- ${o}`),
    "",
    "POINTS DE BLOCAGE",
    blocages.trim() || "—",
  ].filter((l, k, a) => !(l === "" && a[k - 1] === "")).join("\n");

  return (
    <div>
      <div className="carte" style={{ marginBottom: 16 }}>
        <div className="champ">
          <label htmlFor="bien">Bien concerné</label>
          <input id="bien" type="text" maxLength={80} value={bien} onChange={(e) => setBien(e.target.value)} />
        </div>

        <h2 style={{ marginTop: 8 }}>Indivisaires</h2>
        <div className="defile">
          <table className="tableau">
            <thead>
              <tr><th>Nom ou initiales</th><th>Quote-part (%)</th><th>Souhait</th><th>Occupe le bien</th><th /></tr>
            </thead>
            <tbody>
              {liste.map((i) => (
                <tr key={i.id}>
                  <td><input type="text" maxLength={20} value={i.nom} onChange={(e) => maj(i.id, { nom: e.target.value })} style={{ minWidth: 90 }} /></td>
                  <td><input type="number" min={0} max={100} step={0.01} value={i.part} onChange={(e) => maj(i.id, { part: Number(e.target.value) || 0 })} style={{ minWidth: 90 }} /></td>
                  <td>
                    <select value={i.souhait} onChange={(e) => maj(i.id, { souhait: e.target.value as Souhait })} style={{ minWidth: 170 }}>
                      {(Object.keys(SOUHAITS) as Souhait[]).map((s) => <option key={s} value={s}>{SOUHAITS[s].libelle}</option>)}
                    </select>
                  </td>
                  <td style={{ textAlign: "center" }}><input type="checkbox" aria-label="Occupe le bien" checked={i.occupe} onChange={(e) => maj(i.id, { occupe: e.target.checked })} /></td>
                  <td>{liste.length > 1 && <button className="supprimer" onClick={() => setListe((l) => l.filter((x) => x.id !== i.id))}>Retirer</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12, alignItems: "center" }}>
          <button className="bouton secondaire" onClick={ajouter}>Ajouter un indivisaire</button>
          <button className="bouton discret" onClick={repartirEgal}>Parts égales</button>
          <span className={ecart ? "erreur" : "note"}>Total : {pct(total)}{ecart ? " — le total devrait faire 100 %" : ""}</span>
        </div>
        <label className="choix-option" style={{ marginTop: 14 }}>
          <input type="checkbox" checked={usufruit} onChange={(e) => setUsufruit(e.target.checked)} />
          <span>Le bien est grevé d&apos;un usufruit (par exemple au profit du conjoint survivant)</span>
        </label>
      </div>

      <div className="carte resultat">
        <p className="surtitre">Schéma</p>
        <h2>{bien || "Le bien"}</h2>
        <div className="schema-indivision">
          <Anneau liste={liste} total={total} />
          <div>
            {parSouhait.filter((x) => x.part > 0).map((x) => (
              <div key={x.s} style={{ marginBottom: 10 }}>
                <span className="repere" style={{ background: SOUHAITS[x.s].couleur }} />
                <strong>{SOUHAITS[x.s].libelle}</strong> · {pct(x.part)}
                <div className="note" style={{ marginLeft: 18 }}>{x.noms.join(", ")}</div>
              </div>
            ))}
          </div>
        </div>
        {obs.length > 0 && (
          <div className="encadre info" style={{ marginTop: 12 }}>
            <h3>Observations</h3>
            <ul className="liste">{obs.map((o) => <li key={o}>{o}</li>)}</ul>
          </div>
        )}
      </div>

      <div className="carte section">
        <h3>Points de blocage identifiés</h3>
        <p className="note">Valeur du bien, frais d&apos;entretien, souvenirs, calendrier… Notez-les sans chercher encore de solution.</p>
        <ZoneTexte value={blocages} onChange={setBlocages} lignes={4} />
      </div>

      <p className="note section">Schéma indicatif, sans valeur juridique. Les droits de chacun sont à vérifier avec le notaire.</p>
      <ActionsResultat texte={texte} libelleCopie="Copier la synthèse" />
    </div>
  );
}

function Anneau({ liste, total }: { liste: Indivisaire[]; total: number }) {
  const R = 80, r = 50, c = 100;
  let angle = -Math.PI / 2;
  const base = Math.max(total, 100);
  const arcs = liste.filter((i) => i.part > 0).map((i) => {
    const a0 = angle;
    const a1 = angle + (i.part / base) * Math.PI * 2;
    angle = a1;
    const grand = a1 - a0 > Math.PI ? 1 : 0;
    const p = (rad: number, a: number) => `${c + rad * Math.cos(a)} ${c + rad * Math.sin(a)}`;
    const milieu = (a0 + a1) / 2;
    return {
      i,
      d: `M ${p(R, a0)} A ${R} ${R} 0 ${grand} 1 ${p(R, a1 - 0.0001)} L ${p(r, a1 - 0.0001)} A ${r} ${r} 0 ${grand} 0 ${p(r, a0)} Z`,
      lx: c + (R + 14) * Math.cos(milieu),
      ly: c + (R + 14) * Math.sin(milieu),
    };
  });
  return (
    <svg viewBox="-20 -20 240 240" style={{ width: "100%", maxWidth: 260 }} role="img" aria-label="Répartition des quotes-parts">
      {arcs.map((a) => (
        <g key={a.i.id}>
          <path d={a.d} fill={SOUHAITS[a.i.souhait].couleur} stroke="#fff" strokeWidth="2" />
          <text x={a.lx} y={a.ly + 4} fontSize="12" textAnchor="middle" fill="var(--encre)">{a.i.nom}</text>
        </g>
      ))}
      <text x={c} y={c - 2} textAnchor="middle" fontSize="20" fontWeight="600" fill="var(--encre)">{liste.length}</text>
      <text x={c} y={c + 16} textAnchor="middle" fontSize="11" fill="var(--encre-douce)">indivisaires</text>
    </svg>
  );
}
