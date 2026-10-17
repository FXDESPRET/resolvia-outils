"use client";

import { useMemo, useState } from "react";
import ActionsResultat from "@/components/ActionsResultat";
import FriseTemps, { formatMois } from "@/components/FriseTemps";

// VALEURS D'EXEMPLE — à remplacer par les données de la compagnie.
const DEFAUTS = {
  dossiers: 60,
  partMediable: 35,
  tauxAccord: 65,
  coutJudiciaire: 9000,
  coutMediation: 2500,
  moisJudiciaire: 30,
  moisMediation: 4,
  reserveMoyenne: 25000,
  tauxAnnuel: 3,
};
type Valeurs = typeof DEFAUTS;

const TYPES_DOSSIERS = [
  "Responsabilité civile construction : malfaçons, retards, dégâts aux voisins",
  "Protection juridique : litiges contractuels, voisinage, consommation",
  "Recours entre assureurs, notamment lorsque plusieurs intervenants sont assurés",
  "Responsabilité professionnelle : conseils, prestataires de services",
  "Dégâts des eaux et sinistres en copropriété",
  "Litiges sur l'indemnisation avec un assuré ou un tiers lésé",
];

const BENEFICES = [
  "Des dossiers clôturés plus vite, et des réserves libérées plus tôt",
  "Moins de frais de défense, d'expertise et de procédure",
  "Une meilleure satisfaction des assurés, qui gardent la main sur la solution",
  "Des relations préservées avec les intermédiaires et les clients professionnels",
  "Dans les dossiers à plusieurs intervenants, une répartition négociée entre assureurs plutôt qu'une série de recours",
];

const euros = (n: number) =>
  new Intl.NumberFormat("fr-BE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

export default function Portefeuille() {
  const [v, setV] = useState<Valeurs>(DEFAUTS);
  const maj = (k: keyof Valeurs) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setV((x) => ({ ...x, [k]: Number(e.target.value) || 0 }));

  const r = useMemo(() => {
    const orientes = Math.round((v.dossiers * v.partMediable) / 100);
    const accords = Math.round((orientes * v.tauxAccord) / 100);
    const echecs = orientes - accords;
    // Un dossier qui aboutit en médiation évite la procédure ; un échec ajoute le coût de la médiation.
    const economieFrais = accords * (v.coutJudiciaire - v.coutMediation) - echecs * v.coutMediation;
    const moisGagnes = Math.max(0, v.moisJudiciaire - v.moisMediation);
    const coutReserve = (mois: number) => v.reserveMoyenne * (v.tauxAnnuel / 100) * (mois / 12);
    const economieReserves = accords * (coutReserve(v.moisJudiciaire) - coutReserve(v.moisMediation));
    const reservesLiberees = accords * v.reserveMoyenne;
    return { orientes, accords, echecs, economieFrais, moisGagnes, economieReserves, reservesLiberees };
  }, [v]);

  const texte = [
    "PORTEFEUILLE DE SINISTRES ET MÉDIATION — Resolvia",
    `Hypothèses : ${v.dossiers} dossiers litigieux par an, ${v.partMediable} % orientés vers la médiation, ${v.tauxAccord} % d'accords.`,
    "",
    `- Dossiers orientés : ${r.orientes}, dont ${r.accords} accords`,
    `- Économie de frais estimée : ${euros(r.economieFrais)} par an (échecs inclus)`,
    `- Clôture plus rapide : environ ${formatMois(r.moisGagnes)} par dossier réglé`,
    `- Réserves libérées plus tôt : ${euros(r.reservesLiberees)}`,
    `- Coût d'immobilisation évité : ${euros(r.economieReserves)}`,
    "",
    "Estimation indicative fondée sur les seules hypothèses saisies.",
  ].join("\n");

  return (
    <div>
      <div className="encadre attention" style={{ marginBottom: 20 }}>
        Toutes les valeurs proposées sont des <strong>exemples</strong>. Remplacez-les par les statistiques de votre
        portefeuille : le calcul n&apos;a de sens qu&apos;avec vos propres chiffres.
      </div>

      <div className="grille-2">
        <fieldset className="carte" style={{ margin: 0 }}>
          <legend className="etiquette" style={{ padding: "0 6px" }}>Le portefeuille</legend>
          <Champ l="Dossiers litigieux par an" v={v.dossiers} f={maj("dossiers")} />
          <Champ l="Part orientée vers la médiation (%)" a="Dossiers jugés médiables après tri" v={v.partMediable} f={maj("partMediable")} />
          <Champ l="Taux d'accord en médiation (%)" v={v.tauxAccord} f={maj("tauxAccord")} />
          <Champ l="Réserve moyenne par dossier (€)" v={v.reserveMoyenne} f={maj("reserveMoyenne")} />
          <Champ l="Coût de l'argent immobilisé (% par an)" v={v.tauxAnnuel} f={maj("tauxAnnuel")} />
        </fieldset>
        <fieldset className="carte" style={{ margin: 0 }}>
          <legend className="etiquette" style={{ padding: "0 6px" }}>Coûts et durées moyens par dossier</legend>
          <Champ l="Voie judiciaire : frais de gestion externe (€)" a="Défense, expertise, procédure" v={v.coutJudiciaire} f={maj("coutJudiciaire")} />
          <Champ l="Médiation : coût pour la compagnie (€)" v={v.coutMediation} f={maj("coutMediation")} />
          <div className="grille-3">
            <Champ l="Durée judiciaire (mois)" v={v.moisJudiciaire} f={maj("moisJudiciaire")} />
            <Champ l="Durée médiation (mois)" v={v.moisMediation} f={maj("moisMediation")} />
          </div>
        </fieldset>
      </div>

      <div className="carte section resultat">
        <p className="surtitre">Sur une année</p>
        <h2>{r.accords} dossiers réglés environ {formatMois(r.moisGagnes)} plus tôt</h2>
        <div className="tuiles">
          <div className="tuile"><p className="etiquette">Dossiers orientés</p><p className="chiffre">{r.orientes}</p><p className="note" style={{ margin: 0 }}>dont {r.accords} accords et {r.echecs} sans accord</p></div>
          <div className="tuile"><p className="etiquette">Économie de frais</p><p className="chiffre">{euros(r.economieFrais)}</p><p className="note" style={{ margin: 0 }}>coût des échecs déduit</p></div>
          <div className="tuile"><p className="etiquette">Réserves libérées plus tôt</p><p className="chiffre">{euros(r.reservesLiberees)}</p></div>
          <div className="tuile"><p className="etiquette">Immobilisation évitée</p><p className="chiffre">{euros(r.economieReserves)}</p></div>
        </div>
        <FriseTemps
          scenarios={[
            { nom: "Dossier en médiation", segments: [{ libelle: "Médiation", mois: v.moisMediation, couleur: "var(--vert)" }] },
            { nom: "Dossier judiciaire", segments: [{ libelle: "Procédure et expertise", mois: v.moisJudiciaire, couleur: "var(--sauge-fonce)" }] },
          ]}
        />
      </div>

      <div className="grille-2 section">
        <div className="carte">
          <h3>Les dossiers qui s&apos;y prêtent le mieux</h3>
          <ul className="liste">{TYPES_DOSSIERS.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
        <div className="carte">
          <h3>Ce que la compagnie y gagne</h3>
          <ul className="liste">{BENEFICES.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      </div>

      <p className="note section">Estimation indicative fondée sur les seules hypothèses saisies.</p>
      <ActionsResultat texte={texte} libelleCopie="Copier l'estimation">
        <button type="button" className="bouton discret" onClick={() => setV(DEFAUTS)}>Revenir aux valeurs d&apos;exemple</button>
      </ActionsResultat>
    </div>
  );
}

function Champ({ l, a, v, f }: { l: string; a?: string; v: number; f: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="champ">
      <label>
        {l}
        <input type="number" inputMode="decimal" min={0} value={v} onChange={f} style={{ marginTop: 6 }} />
      </label>
      {a && <span className="aide-champ">{a}</span>}
    </div>
  );
}
