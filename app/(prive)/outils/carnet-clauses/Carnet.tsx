"use client";

import { useState } from "react";
import { CATEGORIES, CLAUSES, OPTIONS_FRAIS, OPTIONS_MEDIATEUR, type Clause } from "./clauses";

type Params = {
  mediateur: string;
  delaiDesignation: number;
  delaiMediation: number;
  lieu: string;
  langue: string;
  frais: string;
};

const DEFAUTS: Params = {
  mediateur: OPTIONS_MEDIATEUR[0],
  delaiDesignation: 15,
  delaiMediation: 60,
  lieu: "[lieu]",
  langue: "française",
  frais: OPTIONS_FRAIS[0],
};

function remplir(texte: string, p: Params) {
  return texte.replace(/\{(\w+)\}/g, (_, k: keyof Params) => String(p[k] ?? ""));
}

export default function Carnet() {
  const [p, setP] = useState<Params>(DEFAUTS);
  const [filtre, setFiltre] = useState<Clause["categorie"] | "toutes">("toutes");
  const [copie, setCopie] = useState<string | null>(null);

  const maj = (k: keyof Params) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setP((x) => ({ ...x, [k]: e.target.type === "number" ? Number(e.target.value) || 0 : e.target.value }));

  async function copier(c: Clause) {
    try {
      await navigator.clipboard.writeText(`${c.titre}\n\n${remplir(c.texte, p)}`);
      setCopie(c.id);
      setTimeout(() => setCopie(null), 2500);
    } catch {
      /* indisponible */
    }
  }

  const liste = CLAUSES.filter((c) => filtre === "toutes" || c.categorie === filtre);

  return (
    <div>
      <details className="carte non-imprime" open style={{ marginBottom: 20 }}>
        <summary style={{ cursor: "pointer", fontWeight: 600 }}>Personnaliser les clauses</summary>
        <div className="grille-2" style={{ marginTop: 14 }}>
          <div className="champ">
            <label htmlFor="mediateur">Désignation du médiateur</label>
            <select id="mediateur" value={p.mediateur} onChange={maj("mediateur")}>
              {OPTIONS_MEDIATEUR.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="champ">
            <label htmlFor="frais">Répartition des frais</label>
            <select id="frais" value={p.frais} onChange={maj("frais")}>
              {OPTIONS_FRAIS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="champ">
            <label htmlFor="dd">Délai de désignation (jours)</label>
            <input id="dd" type="number" min={1} value={p.delaiDesignation} onChange={maj("delaiDesignation")} />
          </div>
          <div className="champ">
            <label htmlFor="dm">Durée maximale de la médiation (jours)</label>
            <input id="dm" type="number" min={1} value={p.delaiMediation} onChange={maj("delaiMediation")} />
          </div>
          <div className="champ">
            <label htmlFor="lieu">Lieu</label>
            <input id="lieu" type="text" value={p.lieu} onChange={maj("lieu")} />
          </div>
          <div className="champ">
            <label htmlFor="langue">Langue</label>
            <select id="langue" value={p.langue} onChange={maj("langue")}>
              <option>française</option>
              <option>néerlandaise</option>
              <option>allemande</option>
              <option>anglaise</option>
            </select>
          </div>
        </div>
      </details>

      <div className="onglets non-imprime">
        <button className={`onglet ${filtre === "toutes" ? "actif" : ""}`} onClick={() => setFiltre("toutes")}>Toutes</button>
        {(Object.keys(CATEGORIES) as Clause["categorie"][]).map((c) => (
          <button key={c} className={`onglet ${filtre === c ? "actif" : ""}`} onClick={() => setFiltre(c)}>
            {CATEGORIES[c]}
          </button>
        ))}
      </div>

      {liste.map((c) => (
        <article key={c.id} className="carte" style={{ marginBottom: 16, breakInside: "avoid" }}>
          <p className="etiquette" style={{ margin: 0 }}>{CATEGORIES[c.categorie]}</p>
          <h2 style={{ marginTop: 4 }}>{c.titre}</h2>
          <p className="note">{c.usage}</p>
          <div className="clause">{remplir(c.texte, p)}</div>
          <details className="details">
            <summary>Commentaires et points d&apos;attention</summary>
            <ul className="liste" style={{ marginBottom: 12 }}>
              {c.commentaires.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </details>
          <div style={{ marginTop: 12 }} className="non-imprime">
            <button className="bouton secondaire" onClick={() => copier(c)}>
              {copie === c.id ? "Clause copiée ✓" : "Copier la clause"}
            </button>
          </div>
        </article>
      ))}

      <p className="note section">
        Modèles indicatifs, à adapter à chaque situation et à faire vérifier au regard du droit applicable. Les éléments
        entre crochets sont à compléter.
      </p>
      <div className="actions non-imprime">
        <span />
        <button className="bouton" onClick={() => window.print()}>Imprimer ou enregistrer en PDF</button>
      </div>
    </div>
  );
}
