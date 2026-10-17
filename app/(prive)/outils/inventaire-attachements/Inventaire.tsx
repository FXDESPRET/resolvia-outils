"use client";

import { useState } from "react";
import ActionsResultat from "@/components/ActionsResultat";

type Valeur = "faible" | "moyenne" | "elevee" | "inconnue";
type Bien = { id: number; nom: string; valeur: Valeur; notes: Record<number, number> };
type Personne = { id: number; nom: string };

const VALEURS: Record<Valeur, { libelle: string; x: number }> = {
  faible: { libelle: "Faible", x: 0.15 },
  moyenne: { libelle: "Moyenne", x: 0.5 },
  elevee: { libelle: "Élevée", x: 0.85 },
  inconnue: { libelle: "Inconnue", x: 0.5 },
};

const NIVEAUX = ["Aucun", "Un peu", "Beaucoup", "Essentiel"];

const EXEMPLE_PERSONNES: Personne[] = [
  { id: 1, nom: "A" },
  { id: 2, nom: "B" },
  { id: 3, nom: "C" },
];
const EXEMPLE_BIENS: Bien[] = [
  { id: 1, nom: "Maison familiale", valeur: "elevee", notes: { 1: 3, 2: 1, 3: 3 } },
  { id: 2, nom: "Bague de grand-mère", valeur: "faible", notes: { 1: 0, 2: 3, 3: 1 } },
  { id: 3, nom: "Portefeuille de titres", valeur: "elevee", notes: { 1: 0, 2: 1, 3: 0 } },
];

export default function Inventaire() {
  const [personnes, setPersonnes] = useState<Personne[]>(EXEMPLE_PERSONNES);
  const [biens, setBiens] = useState<Bien[]>(EXEMPLE_BIENS);
  const [nouveauBien, setNouveauBien] = useState("");
  const [nouvellePersonne, setNouvellePersonne] = useState("");

  const prochainId = (l: { id: number }[]) => Math.max(0, ...l.map((x) => x.id)) + 1;

  function ajouterBien() {
    if (!nouveauBien.trim()) return;
    setBiens((b) => [...b, { id: prochainId(b), nom: nouveauBien.trim(), valeur: "inconnue", notes: {} }]);
    setNouveauBien("");
  }
  function ajouterPersonne() {
    if (!nouvellePersonne.trim() || personnes.length >= 8) return;
    setPersonnes((p) => [...p, { id: prochainId(p), nom: nouvellePersonne.trim() }]);
    setNouvellePersonne("");
  }
  function noter(bienId: number, personneId: number, n: number) {
    setBiens((l) => l.map((b) => (b.id === bienId ? { ...b, notes: { ...b.notes, [personneId]: n } } : b)));
  }

  // ---------- Analyse ----------
  const analyse = biens.map((b) => {
    const notes = personnes.map((p) => b.notes[p.id] ?? 0);
    const forts = personnes.filter((p) => (b.notes[p.id] ?? 0) >= 2);
    const essentiels = personnes.filter((p) => (b.notes[p.id] ?? 0) === 3);
    const moyenne = notes.length ? notes.reduce((a, c) => a + c, 0) / notes.length : 0;
    let groupe: "dispute" | "attribuer" | "simple";
    if (essentiels.length >= 2 || forts.length >= 2) groupe = "dispute";
    else if (forts.length === 1) groupe = "attribuer";
    else groupe = "simple";
    return { bien: b, forts, moyenne, groupe };
  });

  const groupes = {
    dispute: analyse.filter((a) => a.groupe === "dispute"),
    attribuer: analyse.filter((a) => a.groupe === "attribuer"),
    simple: analyse.filter((a) => a.groupe === "simple"),
  };
  const noms = (l: Personne[]) => l.map((p) => p.nom).join(", ");

  const texte = [
    "INVENTAIRE DES ATTACHEMENTS — Resolvia",
    `Personnes : ${noms(personnes)}`,
    "",
    "BIENS AUXQUELS PLUSIEURS PERSONNES TIENNENT",
    ...(groupes.dispute.length ? groupes.dispute.map((a) => `- ${a.bien.nom} (${noms(a.forts)})`) : ["- aucun"]),
    "",
    "BIENS QUI COMPTENT SURTOUT POUR UNE PERSONNE",
    ...(groupes.attribuer.length ? groupes.attribuer.map((a) => `- ${a.bien.nom} (${noms(a.forts)})`) : ["- aucun"]),
    "",
    "BIENS SANS ATTACHEMENT PARTICULIER",
    ...(groupes.simple.length ? groupes.simple.map((a) => `- ${a.bien.nom}`) : ["- aucun"]),
  ].join("\n");

  return (
    <div>
      <div className="carte" style={{ marginBottom: 16 }}>
        <h2>1. Les personnes</h2>
        <p className="note">Utilisez des initiales ou des prénoms. Chacun peut aussi remplir l&apos;inventaire seul, avant d&apos;en parler ensemble.</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
          {personnes.map((p) => (
            <span key={p.id} className="pastille st-testeurs" style={{ fontSize: ".9rem", padding: "5px 6px 5px 12px" }}>
              {p.nom}
              {personnes.length > 1 && (
                <button className="supprimer" aria-label={`Retirer ${p.nom}`} onClick={() => setPersonnes((l) => l.filter((x) => x.id !== p.id))}>×</button>
              )}
            </span>
          ))}
        </div>
        <div className="ligne-ajout">
          <div className="champ">
            <label htmlFor="np">Ajouter une personne</label>
            <input id="np" type="text" maxLength={20} value={nouvellePersonne} onChange={(e) => setNouvellePersonne(e.target.value)} onKeyDown={(e) => e.key === "Enter" && ajouterPersonne()} />
          </div>
          <button className="bouton secondaire" onClick={ajouterPersonne}>Ajouter</button>
        </div>
      </div>

      <div className="carte" style={{ marginBottom: 16 }}>
        <h2>2. Les biens et l&apos;attachement de chacun</h2>
        <p className="note">Pour chaque bien, indiquez un ordre de grandeur de sa valeur financière, puis l&apos;attachement de chaque personne.</p>

        {biens.map((b) => (
          <div key={b.id} className="bien">
            <div className="bien-tete">
              <strong>{b.nom}</strong>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <select aria-label="Valeur financière" value={b.valeur} onChange={(e) => setBiens((l) => l.map((x) => (x.id === b.id ? { ...x, valeur: e.target.value as Valeur } : x)))} style={{ width: "auto", padding: "6px 8px" }}>
                  {(Object.keys(VALEURS) as Valeur[]).map((v) => <option key={v} value={v}>Valeur : {VALEURS[v].libelle}</option>)}
                </select>
                <button className="supprimer" onClick={() => setBiens((l) => l.filter((x) => x.id !== b.id))}>Retirer</button>
              </div>
            </div>
            {personnes.map((p) => (
              <div key={p.id} className="bien-ligne">
                <span>{p.nom}</span>
                <div className="echelle" role="group" aria-label={`Attachement de ${p.nom}`}>
                  {NIVEAUX.map((n, i) => (
                    <button key={n} className={(b.notes[p.id] ?? 0) === i ? "actif" : ""} onClick={() => noter(b.id, p.id, i)}>{n}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}

        <div className="ligne-ajout" style={{ marginTop: 12 }}>
          <div className="champ">
            <label htmlFor="nb">Ajouter un bien</label>
            <input id="nb" type="text" maxLength={60} placeholder="Ex. : piano, tableau, terrain, collection…" value={nouveauBien} onChange={(e) => setNouveauBien(e.target.value)} onKeyDown={(e) => e.key === "Enter" && ajouterBien()} />
          </div>
          <button className="bouton secondaire" onClick={ajouterBien}>Ajouter</button>
        </div>
      </div>

      <div className="carte section resultat">
        <p className="surtitre">Lecture</p>
        <h2>Où se situent les enjeux ?</h2>
        <Carte analyse={analyse} />
        <div className="grille-3" style={{ marginTop: 16 }}>
          <Groupe titre="Plusieurs personnes y tiennent" classe="attention" items={groupes.dispute.map((a) => `${a.bien.nom} — ${noms(a.forts)}`)} conseil="À aborder en priorité, en parlant de ce que chaque bien représente avant de parler de sa valeur." />
          <Groupe titre="Compte surtout pour une personne" classe="info" items={groupes.attribuer.map((a) => `${a.bien.nom} — ${noms(a.forts)}`)} conseil="Une attribution peut être envisagée, avec une compensation si la valeur est importante." />
          <Groupe titre="Sans attachement particulier" classe="info" items={groupes.simple.map((a) => a.bien.nom)} conseil="Peuvent souvent être vendus ou partagés selon leur valeur." />
        </div>
      </div>

      <ActionsResultat texte={texte} libelleCopie="Copier la synthèse" />
    </div>
  );
}

function Groupe({ titre, classe, items, conseil }: { titre: string; classe: string; items: string[]; conseil: string }) {
  return (
    <div className={`encadre ${classe}`}>
      <h3>{titre}</h3>
      {items.length ? (
        <ul className="liste" style={{ marginBottom: 8 }}>{items.map((i) => <li key={i}>{i}</li>)}</ul>
      ) : (
        <p style={{ margin: "0 0 8px" }}>Aucun bien.</p>
      )}
      <p className="note" style={{ margin: 0 }}>{conseil}</p>
    </div>
  );
}

/** Carte valeur affective (vertical) × valeur financière (horizontal). */
function Carte({ analyse }: { analyse: { bien: Bien; moyenne: number; groupe: string }[] }) {
  const L = 560, H = 320, m = 34;
  const couleur = (g: string) => (g === "dispute" ? "var(--ambre)" : g === "attribuer" ? "var(--accent)" : "var(--sauge-clair)");
  return (
    <svg viewBox={`0 0 ${L} ${H}`} style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="Carte des biens selon leur valeur affective et financière">
      <rect x={m} y={8} width={L - m - 8} height={H - m - 8} fill="var(--fond)" rx="8" />
      <line x1={m + (L - m - 8) / 2} y1={8} x2={m + (L - m - 8) / 2} y2={H - m} stroke="var(--ligne)" strokeDasharray="4 4" />
      <line x1={m} y1={8 + (H - m - 8) / 2} x2={L - 8} y2={8 + (H - m - 8) / 2} stroke="var(--ligne)" strokeDasharray="4 4" />
      <text x={m + 10} y={26} fontSize="12" fill="var(--encre-douce)">Souvenirs à attribuer</text>
      <text x={L - 18} y={26} fontSize="12" fill="var(--encre-douce)" textAnchor="end">Cœur du partage</text>
      <text x={m + 10} y={H - m - 10} fontSize="12" fill="var(--encre-douce)">Simples à régler</text>
      <text x={L - 18} y={H - m - 10} fontSize="12" fill="var(--encre-douce)" textAnchor="end">Biens à valoriser</text>
      <text x={(L + m) / 2} y={H - 10} fontSize="12" fill="var(--encre-douce)" textAnchor="middle">Valeur financière →</text>
      <text x={14} y={(H - m) / 2} fontSize="12" fill="var(--encre-douce)" textAnchor="middle" transform={`rotate(-90 14 ${(H - m) / 2})`}>Attachement →</text>
      {(() => {
        // Les biens au même endroit sont empilés pour rester lisibles.
        const vus: Record<string, number> = {};
        return analyse.map((a) => {
          const k = `${a.bien.valeur}-${Math.round(a.moyenne * 2)}`;
          const rang = (vus[k] = (vus[k] ?? -1) + 1);
          const fx = VALEURS[a.bien.valeur].x;
          const x = m + 20 + fx * (L - m - 48);
          const y = Math.max(46, H - m - 34 - (a.moyenne / 3) * (H - m - 80) - rang * 20);
          const aGauche = fx > 0.6;
          const nom = a.bien.nom.length > 26 ? a.bien.nom.slice(0, 25) + "…" : a.bien.nom;
          return (
            <g key={a.bien.id}>
              <circle cx={x} cy={y} r="7" fill={couleur(a.groupe)} stroke="#fff" strokeWidth="2" />
              <text x={aGauche ? x - 11 : x + 11} y={y + 4} fontSize="12.5" fill="var(--encre)" textAnchor={aGauche ? "end" : "start"}>{nom}</text>
            </g>
          );
        });
      })()}
    </svg>
  );
}
