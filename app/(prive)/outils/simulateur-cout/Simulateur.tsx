"use client";

import { useMemo, useState } from "react";
import ActionsResultat from "@/components/ActionsResultat";
import FriseTemps, { formatMois } from "@/components/FriseTemps";

// Valeurs d'EXEMPLE, à remplacer par celles du dossier.
// Hypothèses à valider (Amandine) avant ouverture aux testeurs.
const DEFAUTS = {
  tva: true,
  // Médiation
  tauxMediateur: 150,
  seances: 4,
  dureeSeance: 2.5,
  heuresHorsSeance: 4,
  nbParties: 2,
  heuresAvocatMediation: 6,
  dureeMediationMois: 3,
  // Procédure
  tauxAvocat: 150,
  heuresAvocatPremiere: 30,
  appel: false,
  heuresAvocatAppel: 20,
  fraisProcedure: 2500,
  // Durées de la première instance, décomposées
  miseEnEtatMois: 8,
  attenteAudienceMois: 10,
  deliberMois: 2,
  dureeAppelMois: 24,
  // Coût du temps
  montantEnJeu: 30000,
  tauxAnnuel: 4,
  // Temps du client
  heuresClientMediation: 15,
  heuresClientProcedure: 40,
  valeurHeureClient: 0,
};

type Valeurs = typeof DEFAUTS;

const euros = (n: number) =>
  new Intl.NumberFormat("fr-BE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

export default function Simulateur() {
  const [v, setV] = useState<Valeurs>(DEFAUTS);
  const maj = (k: keyof Valeurs) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setV((x) => ({ ...x, [k]: e.target.type === "checkbox" ? e.target.checked : Number(e.target.value) || 0 }));

  const r = useMemo(() => calculer(v), [v]);
  const max = Math.max(r.mediation.total, r.procedure.total, r.echec.total, 1);
  const texte = synthese(v, r);

  return (
    <div>
      <div className="encadre attention" style={{ marginBottom: 20 }}>
        Les montants proposés sont des <strong>valeurs d&apos;exemple</strong>. Remplacez-les par vos propres
        hypothèses : le résultat n&apos;est qu&apos;un ordre de grandeur destiné à éclairer la discussion avec le client.
        Pour un litige technique avec expert et sapiteurs, utilisez plutôt le{" "}
        <a href="/outils/budget-technique">budget de résolution technique</a>.
      </div>

      <div className="grille-2">
        <fieldset className="carte" style={{ margin: 0 }}>
          <legend className="etiquette" style={{ padding: "0 6px" }}>Médiation</legend>
          <Nombre label="Taux horaire du médiateur (€ HTVA)" val={v.tauxMediateur} onChange={maj("tauxMediateur")} />
          <div className="grille-3">
            <Nombre label="Séances" val={v.seances} onChange={maj("seances")} />
            <Nombre label="Heures par séance" val={v.dureeSeance} onChange={maj("dureeSeance")} pas={0.5} />
          </div>
          <Nombre label="Heures hors séance" aide="Préparation, entretiens individuels, rédaction de l'accord" val={v.heuresHorsSeance} onChange={maj("heuresHorsSeance")} />
          <Nombre label="Nombre de parties qui partagent les honoraires" val={v.nbParties} onChange={maj("nbParties")} min={1} />
          <Nombre label="Heures d'avocat pour accompagner le client" val={v.heuresAvocatMediation} onChange={maj("heuresAvocatMediation")} />
          <Nombre label="Durée estimée (mois)" val={v.dureeMediationMois} onChange={maj("dureeMediationMois")} />
        </fieldset>

        <fieldset className="carte" style={{ margin: 0 }}>
          <legend className="etiquette" style={{ padding: "0 6px" }}>Procédure</legend>
          <Nombre label="Taux horaire de l'avocat (€ HTVA)" aide="Utilisé aussi pour l'accompagnement en médiation" val={v.tauxAvocat} onChange={maj("tauxAvocat")} />
          <Nombre label="Heures d'avocat en première instance" val={v.heuresAvocatPremiere} onChange={maj("heuresAvocatPremiere")} />
          <Nombre label="Frais (huissier, expertise, indemnité de procédure…)" aide="Montant global estimé, en euros" val={v.fraisProcedure} onChange={maj("fraisProcedure")} />
          <p className="etiquette" style={{ marginTop: 6 }}>Durée de la première instance</p>
          <div className="grille-3">
            <Nombre label="Échanges de conclusions (mois)" val={v.miseEnEtatMois} onChange={maj("miseEnEtatMois")} />
            <Nombre label="Attente d'une date d'audience (mois)" aide="Arriéré des juridictions" val={v.attenteAudienceMois} onChange={maj("attenteAudienceMois")} />
            <Nombre label="Délibéré et jugement (mois)" val={v.deliberMois} onChange={maj("deliberMois")} />
          </div>
          <label className="choix-option" style={{ marginBottom: 12 }}>
            <input type="checkbox" checked={v.appel} onChange={maj("appel")} />
            <span>Prévoir un appel</span>
          </label>
          {v.appel && (
            <div className="grille-3">
              <Nombre label="Heures d'avocat en appel" val={v.heuresAvocatAppel} onChange={maj("heuresAvocatAppel")} />
              <Nombre label="Durée de l'appel (mois)" val={v.dureeAppelMois} onChange={maj("dureeAppelMois")} />
            </div>
          )}
        </fieldset>
      </div>

      <div className="carte section">
        <h3>Le coût du temps</h3>
        <p className="note">
          Tant que le litige dure, la somme en jeu est bloquée : elle n&apos;est ni encaissée, ni investie, ni
          disponible pour la trésorerie. Indiquez le montant disputé et un taux annuel de référence (rendement,
          coût du crédit ou de la trésorerie).
        </p>
        <div className="grille-3">
          <Nombre label="Montant en jeu (€)" val={v.montantEnJeu} onChange={maj("montantEnJeu")} />
          <Nombre label="Taux annuel de référence (%)" val={v.tauxAnnuel} onChange={maj("tauxAnnuel")} pas={0.5} />
        </div>
      </div>

      <div className="carte section">
        <h3>Le temps du client</h3>
        <p className="note">Réunions, recherche de documents, soucis : un coût souvent oublié. Laissez 0 pour ne pas le chiffrer.</p>
        <div className="grille-3">
          <Nombre label="Heures en médiation" val={v.heuresClientMediation} onChange={maj("heuresClientMediation")} />
          <Nombre label="Heures en procédure" val={v.heuresClientProcedure} onChange={maj("heuresClientProcedure")} />
          <Nombre label="Valeur d'une heure (€)" val={v.valeurHeureClient} onChange={maj("valeurHeureClient")} />
        </div>
        <label className="choix-option">
          <input type="checkbox" checked={v.tva} onChange={maj("tva")} />
          <span>Afficher les honoraires TVA comprise (21 %)</span>
        </label>
      </div>

      <div className="carte section resultat">
        <p className="surtitre">Comparaison pour votre client</p>
        <h2>
          {r.gainMois > 0
            ? `Une solution environ ${formatMois(r.gainMois)} plus tôt`
            : "Dans ces hypothèses, la médiation n'est pas plus rapide"}
        </h2>
        <div className="tuiles">
          <div className="tuile"><p className="etiquette">Temps gagné</p><p className="chiffre">{formatMois(r.gainMois)}</p></div>
          <div className="tuile"><p className="etiquette">Économie directe</p><p className="chiffre">{euros(Math.max(0, r.economie))}</p></div>
          <div className="tuile"><p className="etiquette">Coût du temps évité</p><p className="chiffre">{euros(Math.max(0, r.procedure.immobilisation - r.mediation.immobilisation))}</p></div>
        </div>
        <h3 style={{ marginTop: 8 }}>Combien de temps avant une solution ?</h3>
        <FriseTemps
          scenarios={[
            { nom: "Médiation", segments: [{ libelle: "Médiation", mois: v.dureeMediationMois, couleur: "var(--vert)" }] },
            {
              nom: v.appel ? "Procédure avec appel" : "Procédure",
              segments: [
                { libelle: "Conclusions", mois: v.miseEnEtatMois, couleur: "var(--sauge-fonce)" },
                { libelle: "Attente d'audience", mois: v.attenteAudienceMois, couleur: "var(--ambre)" },
                { libelle: "Jugement", mois: v.deliberMois, couleur: "var(--accent-fonce)" },
                ...(v.appel ? [{ libelle: "Appel", mois: v.dureeAppelMois, couleur: "var(--or)" }] : []),
              ],
            },
          ]}
        />
        <p className="note">
          Les juridictions sont souvent engorgées : une part importante de la durée d&apos;une procédure est de
          l&apos;attente, pendant laquelle rien n&apos;avance. Une médiation se planifie selon l&apos;agenda des parties.
        </p>
        <h3 style={{ marginTop: 16 }}>Combien cela coûte-t-il ?</h3>
        <div style={{ display: "grid", gap: 16, marginTop: 16 }}>
          {[r.mediation, r.procedure, r.echec].map((s) => (
            <div key={s.nom}>
              <div className="bloc-ligne">
                <span>{s.nom}</span>
                <span>{euros(s.total)} · {formatMois(s.mois)}</span>
              </div>
              <div className="barre" style={{ height: 14 }}>
                <div style={{ width: `${(s.total / max) * 100}%`, background: s.couleur }} />
              </div>
              <p className="note" style={{ margin: "4px 0 0" }}>{s.detail}</p>
            </div>
          ))}
        </div>
        <p className="note" style={{ marginTop: 16, marginBottom: 0 }}>
          Le troisième scénario rappelle qu&apos;une médiation n&apos;aboutit pas toujours. Même dans ce cas, le temps
          investi permet souvent de réduire l&apos;étendue du litige soumis au juge.
        </p>
      </div>

      <p className="note section">
        Ordre de grandeur indicatif, établi sur vos seules hypothèses. Il ne constitue ni un devis ni un engagement
        d&apos;honoraires.
      </p>
      <ActionsResultat texte={texte} libelleCopie="Copier la comparaison">
        <button type="button" className="bouton discret" onClick={() => setV(DEFAUTS)}>
          Revenir aux valeurs d&apos;exemple
        </button>
      </ActionsResultat>
    </div>
  );
}

function calculer(v: Valeurs) {
  const coefTva = v.tva ? 1.21 : 1;
  const parties = Math.max(1, v.nbParties);
  const heuresMediateur = v.seances * v.dureeSeance + v.heuresHorsSeance;
  const partMediateur = ((heuresMediateur * v.tauxMediateur) / parties) * coefTva;
  const avocatMediation = v.heuresAvocatMediation * v.tauxAvocat * coefTva;
  const tempsMed = v.heuresClientMediation * v.valeurHeureClient;
  const totalMed = partMediateur + avocatMediation + tempsMed;

  const coutTemps = (mois: number) => v.montantEnJeu * (v.tauxAnnuel / 100) * (mois / 12);
  const heuresProc = v.heuresAvocatPremiere + (v.appel ? v.heuresAvocatAppel : 0);
  const avocatProc = heuresProc * v.tauxAvocat * coefTva;
  const tempsProc = v.heuresClientProcedure * v.valeurHeureClient;
  const totalProc = avocatProc + v.fraisProcedure + tempsProc;
  const moisProc = v.miseEnEtatMois + v.attenteAudienceMois + v.deliberMois + (v.appel ? v.dureeAppelMois : 0);

  const temps = (t: number) => (t > 0 ? `, temps du client ${euros(t)}` : "");
  const tvac = v.tva ? " TVAC" : " HTVA";

  return {
    mediation: {
      nom: "Médiation qui aboutit",
      total: totalMed,
      mois: v.dureeMediationMois,
      immobilisation: coutTemps(v.dureeMediationMois),
      couleur: "var(--vert)",
      detail: `Part du médiateur ${euros(partMediateur)}${tvac}, accompagnement par l'avocat ${euros(avocatMediation)}${temps(tempsMed)}`,
    },
    procedure: {
      nom: v.appel ? "Procédure avec appel" : "Procédure en première instance",
      total: totalProc,
      mois: moisProc,
      immobilisation: coutTemps(moisProc),
      couleur: "var(--sauge-fonce)",
      detail: `Avocat ${euros(avocatProc)}${tvac} (${heuresProc} h), frais ${euros(v.fraisProcedure)}${temps(tempsProc)}`,
    },
    echec: {
      nom: "Médiation sans accord, puis procédure",
      total: totalMed + totalProc,
      mois: v.dureeMediationMois + moisProc,
      immobilisation: coutTemps(v.dureeMediationMois + moisProc),
      couleur: "var(--ambre)",
      detail: "Hypothèse prudente : la médiation s'ajoute à la procédure complète.",
    },
    economie: Math.round(totalProc - totalMed),
    gainMois: Math.max(0, moisProc - v.dureeMediationMois),
  };
}

function synthese(v: Valeurs, r: ReturnType<typeof calculer>) {
  return [
    "COMPARAISON INDICATIVE MÉDIATION / PROCÉDURE — Resolvia",
    `Montants ${v.tva ? "TVA comprise" : "hors TVA"}, sur hypothèses du dossier.`,
    "",
    "DURÉE AVANT UNE SOLUTION",
    `- Médiation : ${formatMois(r.mediation.mois)}`,
    `- ${r.procedure.nom} : ${formatMois(r.procedure.mois)} (dont ${formatMois(v.attenteAudienceMois)} d'attente d'une date d'audience)`,
    `- Temps gagné : ${formatMois(r.gainMois)}`,
    "",
    "COÛTS",
    ...[r.mediation, r.procedure, r.echec].map((s) => `- ${s.nom} : ${euros(s.total)}`),
    "",
    `Coût du temps (somme de ${euros(v.montantEnJeu)} bloquée à ${v.tauxAnnuel} % par an) : ${euros(r.mediation.immobilisation)} en médiation, ${euros(r.procedure.immobilisation)} en procédure.`,
    "",
    "Ordre de grandeur indicatif, ni devis ni engagement d'honoraires.",
  ].join("\n");
}

function Nombre({
  label,
  aide,
  val,
  onChange,
  pas = 1,
  min = 0,
}: {
  label: string;
  aide?: string;
  val: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  pas?: number;
  min?: number;
}) {
  return (
    <div className="champ">
      <label>
        {label}
        <input type="number" inputMode="decimal" min={min} step={pas} value={val} onChange={onChange} style={{ marginTop: 6 }} />
      </label>
      {aide && <span className="aide-champ">{aide}</span>}
    </div>
  );
}
