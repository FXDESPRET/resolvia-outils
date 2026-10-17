"use client";

import { useState } from "react";
import ActionsResultat from "@/components/ActionsResultat";
import ZoneTexte from "@/components/ZoneTexte";
import { SAPITEURS, type SapiteurId } from "@/lib/construction";

const MISSIONS = [
  { id: "constater", texte: "se rendre sur les lieux en présence des parties ou de leurs représentants, et constater les désordres allégués" },
  { id: "decrire", texte: "décrire les désordres et leur évolution, photographies à l'appui" },
  { id: "causes", texte: "rechercher les causes techniques des désordres, sans se prononcer sur les responsabilités juridiques" },
  { id: "travaux", texte: "décrire les travaux de nature à y remédier et en estimer le coût" },
  { id: "urgence", texte: "indiquer les mesures urgentes éventuellement nécessaires pour éviter l'aggravation" },
  { id: "documents", texte: "se faire remettre tout document utile par les parties" },
];

const PORTEES = {
  avis: {
    libelle: "Avis technique non contraignant",
    texte: "Le rapport de l'expert constitue un avis technique. Il ne lie pas les parties, qui l'utilisent comme base commune de discussion.",
  },
  faits: {
    libelle: "Constatations de fait acceptées",
    texte: "Les parties s'engagent à tenir pour acquises les constatations matérielles de l'expert (description et mesures), sans être liées par son analyse des causes ni par ses estimations.",
  },
};

export default function Protocole() {
  const [p, setP] = useState({
    parties: "",
    lieu: "",
    desordres: "",
    expert: "",
    delai: 45,
    plafond: 2000,
    frais: "à parts égales entre les parties",
    portee: "avis" as keyof typeof PORTEES,
    mediation: true,
  });
  const [missions, setMissions] = useState<string[]>(MISSIONS.map((m) => m.id));
  const [sap, setSap] = useState<SapiteurId[]>([]);
  const bascule = <T,>(l: T[], v: T) => (l.includes(v) ? l.filter((x) => x !== v) : [...l, v]);
  const set = (k: keyof typeof p) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setP((x) => ({ ...x, [k]: e.target.type === "number" ? Number(e.target.value) || 0 : e.target.value }));

  const euros = (n: number) => new Intl.NumberFormat("fr-BE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
  const missionsChoisies = MISSIONS.filter((m) => missions.includes(m.id));

  const texte = [
    "PROTOCOLE DE CONSTAT TECHNIQUE CONJOINT",
    "",
    `Entre : ${p.parties.trim() || "[parties]"}`,
    "",
    "1. OBJET",
    `Les parties conviennent de confier un constat technique à un expert choisi d'un commun accord, au sujet des désordres suivants, affectant l'ouvrage situé ${p.lieu.trim() || "[adresse de l'ouvrage]"} :`,
    p.desordres.trim() || "[description sommaire des désordres allégués]",
    "",
    "2. EXPERT",
    `Les parties désignent ${p.expert.trim() || "[nom et qualité de l'expert]"}. L'expert déclare être indépendant des parties et n'avoir aucun intérêt dans le litige.`,
    "",
    "3. MISSION",
    "L'expert a pour mission de :",
    ...missionsChoisies.map((m) => `- ${m.texte} ;`),
    "",
    "4. SAPITEURS",
    sap.length
      ? `L'expert peut recourir, après accord des parties sur le devis, aux analyses suivantes : ${sap.map((s) => SAPITEURS[s].titre.toLowerCase()).join(", ")}. Le budget total des sapiteurs ne dépasse pas ${euros(p.plafond)} TVA comprise sans accord écrit préalable des parties.`
      : `L'expert peut proposer le recours à un sapiteur ; celui-ci n'est mandaté qu'après accord écrit des parties sur sa mission et son devis, dans la limite de ${euros(p.plafond)} TVA comprise.`,
    "",
    "5. DÉROULEMENT",
    "- Les parties donnent accès aux lieux et remettent les documents utiles.",
    "- Jusqu'au constat, elles s'abstiennent de modifier l'état des lieux, sauf mesures de sécurité ou destinées à éviter l'aggravation, qui sont documentées et signalées aux autres parties.",
    "- Chaque partie peut faire valoir ses observations ; l'expert en tient compte dans son rapport.",
    `- L'expert remet son rapport dans les ${p.delai} jours de la première visite.`,
    "",
    "6. FRAIS",
    `Les honoraires et frais de l'expert et des sapiteurs sont supportés ${p.frais}, sans préjudice de la répartition qui pourra être convenue dans un accord global.`,
    "",
    "7. PORTÉE DU RAPPORT",
    PORTEES[p.portee].texte,
    ...(p.mediation
      ? ["", "8. ARTICULATION AVEC LA MÉDIATION", "Le rapport est remis aux parties et au médiateur. Il sert de base aux séances de médiation. Les échanges intervenus en médiation restent confidentiels."]
      : []),
    "",
    `${p.mediation ? "9" : "8"}. DROITS DES PARTIES`,
    "Le présent protocole ne constitue pas une reconnaissance de responsabilité. Chaque partie conserve le droit d'agir en justice, y compris pour solliciter des mesures urgentes.",
    "",
    "Fait à [lieu], le [date], en autant d'exemplaires que de parties, plus un pour l'expert.",
    "",
    "Signatures des parties et de l'expert :",
  ].join("\n");

  return (
    <div>
      <div className="carte non-imprime" style={{ marginBottom: 16 }}>
        <h2>Les parties et l&apos;ouvrage</h2>
        <div className="grille-2">
          <div className="champ"><label htmlFor="pa">Parties</label><input id="pa" type="text" value={p.parties} onChange={set("parties")} placeholder="Maître d'ouvrage, entrepreneur, …" /></div>
          <div className="champ"><label htmlFor="li">Adresse de l&apos;ouvrage</label><input id="li" type="text" value={p.lieu} onChange={set("lieu")} /></div>
        </div>
        <div className="champ">
          <label htmlFor="de">Désordres allégués (description sommaire et neutre)</label>
          <ZoneTexte id="de" value={p.desordres} onChange={(x) => setP((y) => ({ ...y, desordres: x }))} lignes={3} />
        </div>
        <div className="champ"><label htmlFor="ex">Expert choisi d&apos;un commun accord</label><input id="ex" type="text" value={p.expert} onChange={set("expert")} /></div>
      </div>

      <div className="carte non-imprime" style={{ marginBottom: 16 }}>
        <h2>La mission</h2>
        <div className="choix">
          {MISSIONS.map((m) => (
            <label key={m.id} className={`choix-option ${missions.includes(m.id) ? "choisi" : ""}`}>
              <input type="checkbox" checked={missions.includes(m.id)} onChange={() => setMissions((l) => bascule(l, m.id))} />
              <span>{m.texte.charAt(0).toUpperCase() + m.texte.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="carte non-imprime" style={{ marginBottom: 16 }}>
        <h2>Les sapiteurs et les frais</h2>
        <div className="grille-2" style={{ marginBottom: 12 }}>
          {(Object.keys(SAPITEURS) as SapiteurId[]).map((s) => (
            <label key={s} className={`choix-option ${sap.includes(s) ? "choisi" : ""}`}>
              <input type="checkbox" checked={sap.includes(s)} onChange={() => setSap((l) => bascule(l, s))} />
              <span>{SAPITEURS[s].titre}</span>
            </label>
          ))}
        </div>
        <div className="grille-3">
          <div className="champ"><label htmlFor="pl">Plafond des sapiteurs (€ TVAC)</label><input id="pl" type="number" min={0} step={100} value={p.plafond} onChange={set("plafond")} /></div>
          <div className="champ"><label htmlFor="dl">Délai du rapport (jours)</label><input id="dl" type="number" min={1} value={p.delai} onChange={set("delai")} /></div>
          <div className="champ">
            <label htmlFor="fr">Répartition des frais</label>
            <select id="fr" value={p.frais} onChange={set("frais")}>
              <option>à parts égales entre les parties</option>
              <option>par la partie qui demande le constat, à titre d&apos;avance</option>
              <option>selon une clé de répartition à préciser : [à compléter]</option>
            </select>
          </div>
        </div>
      </div>

      <div className="carte non-imprime" style={{ marginBottom: 16 }}>
        <h2>La portée du rapport</h2>
        <div className="choix">
          {(Object.keys(PORTEES) as (keyof typeof PORTEES)[]).map((k) => (
            <label key={k} className={`choix-option ${p.portee === k ? "choisi" : ""}`}>
              <input type="radio" name="portee" checked={p.portee === k} onChange={() => setP((x) => ({ ...x, portee: k }))} />
              <span><strong>{PORTEES[k].libelle}</strong><small>{PORTEES[k].texte}</small></span>
            </label>
          ))}
          <label className={`choix-option ${p.mediation ? "choisi" : ""}`}>
            <input type="checkbox" checked={p.mediation} onChange={(e) => setP((x) => ({ ...x, mediation: e.target.checked }))} />
            <span>Le constat s&apos;inscrit dans une médiation</span>
          </label>
        </div>
      </div>

      <div className="carte document resultat">
        <p className="surtitre non-imprime">Votre protocole</p>
        <div style={{ whiteSpace: "pre-wrap" }}>{texte}</div>
      </div>

      <p className="note section">
        Modèle indicatif à adapter et à faire relire. Un expert qui réalise le constat ne peut pas, dans le même dossier,
        intervenir ensuite comme médiateur.
      </p>
      <ActionsResultat texte={texte} libelleCopie="Copier le protocole" />
    </div>
  );
}
