"use client";

import { useState } from "react";
import ActionsResultat from "@/components/ActionsResultat";
import { OUVRAGES, PREUVES_GENERALES, SAPITEURS, type Ouvrage } from "@/lib/construction";

export default function Fiches() {
  const [onglet, setOnglet] = useState<Ouvrage["id"]>("piscine");
  const ouvrage = OUVRAGES.find((o) => o.id === onglet)!;

  return (
    <div>
      <div className="onglets non-imprime">
        {OUVRAGES.map((o) => (
          <button key={o.id} className={`onglet ${onglet === o.id ? "actif" : ""}`} onClick={() => setOnglet(o.id)}>{o.titre}</button>
        ))}
      </div>

      <p className="chapeau" style={{ fontSize: "1rem" }}>{ouvrage.intro}</p>

      {ouvrage.desordres.map((d) => (
        <article key={d.id} className="carte" style={{ marginBottom: 16, breakInside: "avoid" }}>
          <p className="etiquette" style={{ margin: 0 }}>{ouvrage.titre}</p>
          <h2 style={{ marginTop: 4 }}>{d.titre}</h2>
          <p className="note">{d.signes}</p>
          <div className="grille-2">
            <div>
              <h3>Les questions à poser</h3>
              <ul className="liste">{d.questions.map((q) => <li key={q}>{q}</li>)}</ul>
            </div>
            <div>
              <h3>Les preuves à conserver</h3>
              <ul className="cases">{d.preuves.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          </div>
          <div style={{ marginTop: 10 }}>
            <p className="etiquette" style={{ marginBottom: 6 }}>Analyses utiles</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {d.sapiteurs.map((s) => <span key={s} className="pastille st-testeurs" title={SAPITEURS[s].usage}>{SAPITEURS[s].titre}</span>)}
            </div>
          </div>
          {d.piege && <div className="encadre attention" style={{ marginTop: 14 }}><strong>Piège fréquent :</strong> {d.piege}</div>}
        </article>
      ))}

      <div className="encadre info section">
        <h3>Dans tous les cas</h3>
        <ul className="liste">{PREUVES_GENERALES.map((p) => <li key={p}>{p}</li>)}</ul>
      </div>

      <ActionsResultat />
    </div>
  );
}
