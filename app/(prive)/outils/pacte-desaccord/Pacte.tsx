"use client";

import { useState } from "react";
import ActionsResultat from "@/components/ActionsResultat";

const SUJETS = [
  "la stratégie et les grandes orientations",
  "les investissements et le financement",
  "la répartition des rôles et des responsabilités",
  "la rémunération et les dividendes",
  "l'entrée ou la sortie d'un associé",
  "les relations avec le personnel ou les partenaires",
];

const REGLES = [
  { id: "ecrit", texte: "Le désaccord est signalé par écrit, de manière factuelle, aux autres associés." },
  { id: "continuite", texte: "La gestion courante de la société continue normalement pendant toute la durée du processus." },
  { id: "irreversible", texte: "Aucune décision irréversible liée au désaccord n'est prise pendant le processus, sauf urgence." },
  { id: "discretion", texte: "Le désaccord n'est pas évoqué avec le personnel, les clients, les fournisseurs ou les banques sans accord préalable." },
  { id: "confidentialite", texte: "Les échanges intervenus dans le cadre de ce processus restent confidentiels." },
  { id: "respect", texte: "Chacun s'exprime avec respect et s'abstient de mettre en cause les intentions des autres." },
];

export default function Pacte() {
  const [societe, setSociete] = useState("");
  const [associes, setAssocies] = useState("");
  const [sujets, setSujets] = useState<string[]>(SUJETS.slice(0, 5));
  const [regles, setRegles] = useState<string[]>(REGLES.map((r) => r.id));
  const [d, setD] = useState({ direct: 15, tiers: true, tiersRole: "notre expert-comptable", tiersDelai: 15, mediationDesignation: 15, mediationDuree: 60, recours: "la juridiction compétente", revue: "chaque année, lors de l'assemblée générale ordinaire" });

  const bascule = (l: string[], v: string) => (l.includes(v) ? l.filter((x) => x !== v) : [...l, v]);
  const nomSociete = societe.trim() || "[nom de la société]";
  const nomsAssocies = associes.trim() || "[noms des associés]";

  // Construction du texte du pacte.
  let n = 0;
  const etapes: string[] = [];
  etapes.push(`Étape ${++n} — Discussion directe. L'associé qui constate le désaccord en informe les autres par écrit. Les associés se réunissent dans les ${d.direct} jours pour en parler, chacun exposant son point de vue et ce qui est important pour lui.`);
  if (d.tiers) etapes.push(`Étape ${++n} — Tiers de confiance. À défaut de solution, les associés sollicitent ${d.tiersRole || "[tiers de confiance]"} pour une réunion d'échange dans les ${d.tiersDelai} jours. Ce tiers éclaire la discussion mais ne décide pas.`);
  etapes.push(`Étape ${++n} — Médiation. Si le désaccord persiste, les associés recourent à la médiation et désignent de commun accord un médiateur agréé dans les ${d.mediationDesignation} jours. Ils participent de bonne foi à au moins une réunion de médiation.`);
  etapes.push(`Étape ${++n} — Autres voies. À défaut d'accord dans les ${d.mediationDuree} jours de la première réunion de médiation, chaque associé recouvre sa liberté de saisir ${d.recours || "[juridiction ou arbitrage]"}.`);

  const reglesChoisies = REGLES.filter((r) => regles.includes(r.id));
  const texte = [
    `PACTE DE DÉSACCORD — ${nomSociete}`,
    "",
    `Entre : ${nomsAssocies}`,
    "",
    "1. POURQUOI CE PACTE",
    "Nous savons que des désaccords peuvent survenir entre nous. Nous convenons dès aujourd'hui, à froid, de la manière dont nous les traiterons, pour protéger notre société, notre relation et le travail de chacun.",
    "",
    "2. LES DÉSACCORDS CONCERNÉS",
    `Ce pacte s'applique notamment aux désaccords portant sur ${sujets.length ? sujets.join(", ") : "[sujets]"}.`,
    "",
    "3. LES ÉTAPES",
    ...etapes,
    "Ces étapes ne font pas obstacle aux mesures urgentes nécessaires pour protéger la société.",
    "",
    "4. NOS RÈGLES DE CONDUITE",
    ...reglesChoisies.map((r) => `- ${r.texte}`),
    "",
    "5. REVUE DU PACTE",
    `Nous relisons ce pacte ${d.revue || "[périodicité]"}, et l'adaptons si nécessaire.`,
    "",
    "Fait à [lieu], le [date], en autant d'exemplaires que de signataires.",
    "",
    "Signatures :",
  ].join("\n");

  return (
    <div>
      <div className="carte non-imprime" style={{ marginBottom: 16 }}>
        <h2>Les parties</h2>
        <div className="grille-2">
          <div className="champ"><label htmlFor="soc">Société</label><input id="soc" type="text" value={societe} onChange={(e) => setSociete(e.target.value)} placeholder="Nom de la société" /></div>
          <div className="champ"><label htmlFor="ass">Associés</label><input id="ass" type="text" value={associes} onChange={(e) => setAssocies(e.target.value)} placeholder="Noms des associés signataires" /></div>
        </div>
      </div>

      <div className="carte non-imprime" style={{ marginBottom: 16 }}>
        <h2>Les désaccords concernés</h2>
        <div className="choix">
          {SUJETS.map((s) => (
            <label key={s} className={`choix-option ${sujets.includes(s) ? "choisi" : ""}`}>
              <input type="checkbox" checked={sujets.includes(s)} onChange={() => setSujets((l) => bascule(l, s))} />
              <span>{s.charAt(0).toUpperCase() + s.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="carte non-imprime" style={{ marginBottom: 16 }}>
        <h2>Les étapes et les délais</h2>
        <div className="grille-2">
          <div className="champ"><label htmlFor="d1">Discussion directe : réunion dans les (jours)</label><input id="d1" type="number" min={1} value={d.direct} onChange={(e) => setD({ ...d, direct: Number(e.target.value) || 0 })} /></div>
          <div className="champ"><label htmlFor="d3">Médiation : désignation dans les (jours)</label><input id="d3" type="number" min={1} value={d.mediationDesignation} onChange={(e) => setD({ ...d, mediationDesignation: Number(e.target.value) || 0 })} /></div>
          <div className="champ"><label htmlFor="d4">Médiation : durée maximale (jours)</label><input id="d4" type="number" min={1} value={d.mediationDuree} onChange={(e) => setD({ ...d, mediationDuree: Number(e.target.value) || 0 })} /></div>
          <div className="champ"><label htmlFor="rec">Ensuite, recours à</label><input id="rec" type="text" value={d.recours} onChange={(e) => setD({ ...d, recours: e.target.value })} /></div>
        </div>
        <label className="choix-option" style={{ margin: "6px 0 12px" }}>
          <input type="checkbox" checked={d.tiers} onChange={(e) => setD({ ...d, tiers: e.target.checked })} />
          <span>Prévoir une étape intermédiaire avec un tiers de confiance</span>
        </label>
        {d.tiers && (
          <div className="grille-2">
            <div className="champ"><label htmlFor="tr">Tiers de confiance</label><input id="tr" type="text" value={d.tiersRole} onChange={(e) => setD({ ...d, tiersRole: e.target.value })} /></div>
            <div className="champ"><label htmlFor="td">Réunion dans les (jours)</label><input id="td" type="number" min={1} value={d.tiersDelai} onChange={(e) => setD({ ...d, tiersDelai: Number(e.target.value) || 0 })} /></div>
          </div>
        )}
        <div className="champ"><label htmlFor="rv">Revue du pacte</label><input id="rv" type="text" value={d.revue} onChange={(e) => setD({ ...d, revue: e.target.value })} /></div>
      </div>

      <div className="carte non-imprime" style={{ marginBottom: 16 }}>
        <h2>Les règles de conduite</h2>
        <div className="choix">
          {REGLES.map((r) => (
            <label key={r.id} className={`choix-option ${regles.includes(r.id) ? "choisi" : ""}`}>
              <input type="checkbox" checked={regles.includes(r.id)} onChange={() => setRegles((l) => bascule(l, r.id))} />
              <span>{r.texte}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="carte document resultat">
        <p className="surtitre non-imprime">Votre pacte</p>
        <div style={{ whiteSpace: "pre-wrap" }}>{texte}</div>
      </div>

      <p className="note section">
        Ce pacte organise le dialogue entre associés ; il ne remplace ni les statuts ni une convention d&apos;actionnaires.
        Pour lui donner une portée juridique, faites-le relire par votre conseil et, le cas échéant, intégrez-le à la
        convention d&apos;actionnaires.
      </p>
      <ActionsResultat texte={texte} libelleCopie="Copier le pacte" />
    </div>
  );
}
